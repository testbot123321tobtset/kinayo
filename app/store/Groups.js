Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        hasDataSetOnce: null
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
