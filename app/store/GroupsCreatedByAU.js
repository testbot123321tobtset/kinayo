Ext.define('X.store.GroupsCreatedByAU', {
    extend: 'X.store.Groups',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsCreatedByAUStore',
        autoLoad: false,
        autoSync: false
    },
    /*
     * EVENT HANDLERS
     */
    //    Before the store loads, this makes sure that the store is configured with the where clause
    //    needed for Parse to return only groups that are created by the authenticated user
    onBeforeLoad: function(me, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.GroupsCreatedByAU.onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                        key: 'hasCreated'
                    }
                });
                me.getProxy().
                        setExtraParam('where', whereClause);
            
                return me.callParent(arguments);
            }
        }
    },
    onLoad: function(me, records, successful, operation, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.GroupsCreatedByAU.onLoad(): Will call waitForGroupsAUCreatedByStoreAndGroupsCreatedByAUStoreToLoadThenLocallyLoad() on GroupsStore: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var groupsStore = Ext.getStore('GroupsStore');
        if (Ext.isObject(groupsStore)) {
            groupsStore.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad();
        }

        me.callParent(arguments);
        return me;
    },
    onAddRecords: function(me, records, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.GroupsAUIsMemberOf.onAddRecords(): Records added:');
            console.log(records);
            console.log('Debug: Will call add() on GroupsStore: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        if (records.length > 0) {
            var groupsStore = Ext.getStore('GroupsStore');
            if (Ext.isObject(groupsStore)) {
                Ext.Array.each(records, function(thisGroup) {
                    groupsStore.add(thisGroup);
                });
            }
        }

        me.callParent(arguments);
        return me;
    }
});
