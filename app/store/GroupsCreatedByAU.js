Ext.define('X.store.GroupsCreatedByAU', {
    extend: 'X.store.Groups',
    config: {
        storeId: 'GroupsCreatedByAUStore'
    },
//    
//    EVENT HANDLERS

//    Before the store loads, this makes sure that the store is configured with the 
//    where clause needed for Parse to return only groups that are created by the
//    authenticated user
    onBeforeLoad: function(store, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.GroupsCreatedByAU.onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var authenticatedUser = X.authenticatedUser;
        if (Ext.isObject(authenticatedUser)) {
            var authenticatedUserObjectId = authenticatedUser.get('objectId');
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
            me.getProxy().setExtraParam('where', whereClause);
            
            me.callParent(arguments);
            return me;
        }

//        Only load if the where clause for this store is set correctly in the URL
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.GroupsCreatedByAU.onBeforeLoad(): Failed: Where clause in the URL could not be correctly edited: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return false;
    },
    onLoad: function() {
        var me = this;
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
        
        if(records.length > 0) {
            var groupsStore = Ext.getStore('GroupsStore');
            if (Ext.isObject(groupsStore)) {
                Ext.Array.each(records, function(thisGroup) {
                    groupsStore.add(groupsStore);
                });
            }
        }
        
        me.callParent(arguments);
        return me;
    }
});
