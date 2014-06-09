Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        hasDataSetOnce: null
    },
    //    
    //    EVENT HANDLERS

    //    Before the store loads, this makes sure that the store is configured with the 
    //    where clause needed for Parse to return only groups that are created by the
    //    authenticated user
    onBeforeLoad: function(me, operation, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.callParent(arguments);
        return me;
    },
    onLoad: function(me, records, successful, operation, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.onLoad(): Will call waitForGroupsAUCreatedByStoreAndGroupsCreatedByAUStoreToLoadThenLocallyLoad() on GroupsStore: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.callParent(arguments);
        return me;
    },
    onAddRecords: function(me, records, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.onAddRecords(): Records added:');
            console.log(records);
            console.log('Debug: Will call add() on GroupsStore: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.callParent(arguments);
        return me;
    },
    waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad: function(callback) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var groupsAUIsMemberOfStore = Ext.getStore('GroupsAUIsMemberOfStore');
        var groupsCreatedByAUStore = Ext.getStore('GroupsCreatedByAUStore');
        if (Ext.isObject(groupsAUIsMemberOfStore) && Ext.isObject(groupsCreatedByAUStore)) {
            if (!groupsAUIsMemberOfStore.isLoading() && groupsAUIsMemberOfStore.isLoaded() && !groupsCreatedByAUStore.isLoading() && groupsCreatedByAUStore.isLoaded()) {
                me.setDataFromGroupsAUCreatedByAndGroupsMemberOfStores();
                if (Ext.isObject(callback)) {
                    me.executeCallback(callback);
                }
            }
            else {
                if (X.config.Config.getDEBUG()) {
                    console.log('Debug: X.store.Groups.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad(): Will now try to load GroupsAUIsMemberOfStore');
                }
                me.runTask({
                    fn: function() {
                        if (X.config.Config.getDEBUG()) {
                            console.log('Debug: X.store.Groups.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad(): Task will stop: Will now execute callback: Will now try to load GroupsCreatedByAUStore');
                        }
                        me.executeCallback({
                            fn: function() {
                                if (X.config.Config.getDEBUG()) {
                                    console.log('Debug: X.store.Groups.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad(): Will now try to load GroupsCreatedByAUStore');
                                }

                                me.runTask({
                                    fn: function() {
                                        if (X.config.Config.getDEBUG()) {
                                            console.log('Debug: X.store.Groups.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad(): Task will stop: Will now set aggregated data in GroupsStore and execute callback');
                                        }

                                        me.setDataFromGroupsAUCreatedByAndGroupsMemberOfStores();
                                        if (Ext.isObject(callback)) {
                                            me.executeCallback(callback);
                                        }
                                    },
                                    condition: function() {
                                        return !groupsCreatedByAUStore.isLoading();
                                    },
                                    delay: 100,
                                    limit: 2000,
                                    scope: me
                                });

                            },
                            scope: me
                        });
                    },
                    condition: function() {
                        return !groupsAUIsMemberOfStore.isLoading();
                    },
                    delay: 100,
                    limit: 2000,
                    scope: me
                });
            }
        }

        return me;
    },
    setDataFromGroupsAUCreatedByAndGroupsMemberOfStores: function() {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.setDataFromGroupsAUCreatedByAndGroupsMemberOfStores(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var groupsAUIsMemberOfStore = Ext.getStore('GroupsAUIsMemberOfStore');
        var groupsCreatedByAUStore = Ext.getStore('GroupsCreatedByAUStore');
        if (Ext.isObject(groupsAUIsMemberOfStore) && Ext.isObject(groupsCreatedByAUStore)) {
            var dataFromGroupsAUIsMemberOfStore = groupsAUIsMemberOfStore.getData();
            var dataFromGroupsCreatedByAUStore = groupsCreatedByAUStore.getData();

            var combinedData = [
            ];
            dataFromGroupsAUIsMemberOfStore.each(function(thisGroup) {
                combinedData.push(thisGroup);
            });
            dataFromGroupsCreatedByAUStore.each(function(thisGroup) {
                if (Ext.Array.contains(combinedData, thisGroup)) {
                    combinedData.push(thisGroup);
                }
            });

            me.setData(combinedData);

            me.setHasDataSetOnce(true);
        }

        return me;
    }
});
