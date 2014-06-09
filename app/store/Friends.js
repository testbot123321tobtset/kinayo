Ext.define('X.store.Friends', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Friend',
        storeId: 'FriendsStore',
        autoLoad: false,
        autoSync: false
    },
    /*
     * EVENT HANDLERS
     */
    //    Before the store loads, we set the where clause such that this only gets those who
    //    the authenticated user is friends with
    onBeforeLoad: function(store, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Friends.onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var authenticatedUser = X.authenticatedUser;
        if (Ext.isObject(authenticatedUser)) {

            var authenticatedUserObjectId = authenticatedUser.get('objectId');
            authenticatedUserObjectId = (Ext.isString(authenticatedUserObjectId) && !Ext.isEmpty(authenticatedUserObjectId)) ? authenticatedUserObjectId : false;
            if (authenticatedUserObjectId) {

                var whereClause = Ext.encode({
                    $relatedTo: {
                        object: {
                            __type: 'Pointer',
                            className: '_User',
                            objectId: authenticatedUserObjectId
                        },
                        key: 'isFriendsWith'
                    }
                });
                me.getProxy().
                        setExtraParam('where', whereClause);
                
                return me.callParent(arguments);
            }
        }
    }
});
