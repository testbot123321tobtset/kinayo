Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        autoLoad: false,
        autoSync: false,
        
        hasDataSetOnce: null
    },
    
    waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad: function(callback) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.waitForGroupsAUCreatedByStoreAndGroupsAUIsMemberOfStoreToLoadThenLocallyLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var groupsAUIsMemberOfStore = Ext.getStore('GroupsAUIsMemberOfStore');
        var groupsCreatedByAUStore = Ext.getStore('GroupsCreatedByAUStore');
        if(Ext.isObject(groupsAUIsMemberOfStore) && Ext.isObject(groupsCreatedByAUStore)) {
            if(!groupsAUIsMemberOfStore.isLoading() && groupsAUIsMemberOfStore.isLoaded() && !groupsCreatedByAUStore.isLoading() && groupsCreatedByAUStore.isLoaded()) {
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
                                    delay: 1000,
                                    limit: 10000,
                                    scope: me
                                });

                            },
                            scope: me
                        });
                    },
                    condition: function() {
                        return !groupsAUIsMemberOfStore.isLoading();
                    },
                    delay: 1000,
                    limit: 10000,
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
        if(Ext.isObject(groupsAUIsMemberOfStore) && Ext.isObject(groupsCreatedByAUStore)) {
            var dataFromGroupsAUIsMemberOfStore = groupsAUIsMemberOfStore.getData();
            var dataFromGroupsCreatedByAUStore = groupsCreatedByAUStore.getData();
            
            var combinedData = [];
            dataFromGroupsAUIsMemberOfStore.each(function(thisGroup) {
                combinedData.push(thisGroup);
            });
            dataFromGroupsCreatedByAUStore.each(function(thisGroup) {
                if(Ext.Array.contains(combinedData, thisGroup)) {
                    combinedData.push(thisGroup);
                }
            });
            
            me.setData(combinedData);
            
            me.setHasDataSetOnce(true);
        }
        
        return me;
    }
});
