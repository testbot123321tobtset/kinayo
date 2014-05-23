Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: false
    },
//    Event handlers
    onLoad: function() {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups: onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
//        Websocket: join group rooms
        me.runTask({
            fn: function() {
                if (X.config.Config.getDEBUG()) {
                    console.log('Debug: X.store.Groups: onLoad(): Will now join rooms by calling joinRooms(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }

                me.joinRooms();
            },
            condition: function() {
                return ('Socket' in X && Ext.isObject(X.Socket));
            },
            delay: 1000,
            limit: 50000,
            scope: me
        });
        
        me.callParent(arguments);
    },
//    Helper methods
//    Websocket
    joinRooms: function(xSocket) {
        var me = this;
        if(X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups.joinRooms(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        xSocket = Ext.isObject(xSocket) ? xSocket : X.Socket;
        if(Ext.isObject(xSocket)) {
            if (me.getAllCount() > 0) {
                me.each(function(thisGroup) {
                    thisGroup.joinRoom(xSocket);
                });
            }
            return me;
        }
        
        return false;
    }
});
