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
        
        var parseSessionStore = Ext.getStore('ParseSessionStore');
        if (Ext.isObject(parseSessionStore)) {
            
            var session = parseSessionStore.getSession();
            if (Ext.isObject(session) && !Ext.isEmpty(session)) {
                
                var userIdFromSession = ('userId' in session && Ext.isString(session.userId) && !Ext.isEmpty(session.userId)) ? session.userId : false;
                if (userIdFromSession) {
                    
                    var sessionToken = ('sessionToken' in session && Ext.isString(session.sessionToken) && !Ext.isEmpty(session.sessionToken)) ? session.sessionToken : false;
                    if (sessionToken) {
                        
                        me.setUrlPostfixEndpoint(userIdFromSession);
                        me.setSessionHeaderForAllStores(sessionToken);

                        me.callParent(arguments);
                    }
                }
            }
        }

//        var authenticatedUser = X.authenticatedUser;
//        if (Ext.isObject(authenticatedUser)) {
//
//            var authenticatedUserObjectId = authenticatedUser.get('objectId');
//            authenticatedUserObjectId = (Ext.isString(authenticatedUserObjectId) && !Ext.isEmpty(authenticatedUserObjectId)) ? authenticatedUserObjectId : false;
//            if (authenticatedUserObjectId) {
//                
//                
//
////                var whereClause = Ext.encode({
////                    $relatedTo: {
////                        object: {
////                            __type: 'Pointer',
////                            className: '_User',
////                            objectId: authenticatedUserObjectId
////                        },
////                        key: 'isFriendsWith'
////                    }
////                });
////                me.getProxy().
////                        setExtraParam('where', whereClause);
//                
//                return me.callParent(arguments);
//            }
//        }
    },
    //    This sets the url such that the endpoint refers to the objectId of the user currently in session
    //    This is needed to perform any updates using store.sync()
    setUrlPostfixEndpoint: function(endpoint) {
        var me = this;

        me.getProxy().
                setUrl(X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT + '/' + endpoint);

        return me;
    },
    //    This resets what setUrlPostfixEndpoint() does
    resetUrlPostfixEndpoint: function() {
        var me = this;

        me.getProxy().
                setUrl(X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT);

        return me;
    }
});
