Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        hasDataSetOnce: null,
        sorters: [
            {
                sorterFn: function(group1, group2) {
                    if(group1.get('updatedAt') && group2.get('updatedAt')) {
                        
                        return group1.get('updatedAt') > group2.get('updatedAt') ? 1 : (group1.get('updatedAt') === group2.get('updatedAt') ? 0 : -1);
                    }
                    else if((group1.get('updatedAt') && !group2.get('updatedAt')) || (!group1.get('updatedAt') && group2.get('updatedAt'))) {
                        
                        return 1;
                    }
                    else if(!group1.get('updatedAt') && !group2.get('updatedAt')) {
                        
                        return group1.get('createdAt') > group2.get('createdAt') ? 1 : (group1.get('createdAt') === group2.get('createdAt') ? 0 : -1);
                    }
                },
                direction: 'DESC'
            },
            {
                property: 'title',
                direction: 'ASC'
            }
        ]
    },
    //    
    //    EVENT HANDLERS
    onBeforeLoad: function(me, operation, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.callParent(arguments);
        return me;
    },
    onLoad: function(me, records, successful, operation, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.onLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
    }
});
