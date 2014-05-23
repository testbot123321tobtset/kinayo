Ext.define('X.store.AuthenticatedUser', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.AuthenticatedUser',
        storeId: 'AuthenticatedUserStore',
        autoLoad: false,
        autoSync: false,
        mustBeEmptiedOnApplicationShutDown: false
    },
//    Event handlers
    onLoad: function(store, records, successful, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        Ext.Viewport.fireEvent('authenticateduserstoreload', {
            authenticatedUserStore: me,
            authenticatedUser: me.getAt(0)
        });
        
////        TODO: This should subscribe to a Parse channel
//        me.runTask({
//            fn: function() {
//                if (X.config.Config.getDEBUG()) {
//                    console.log('Debug: X.store.AuthenticatedUser: onLoad(): Will now join rooms by calling joinRoom(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                }
////                TODO: This should have the code to subscribe to a Parse channel
////                me.joinRoom();
//            },
//            condition: function() {
//                return ('Socket' in X && Ext.isObject(X.Socket));
//            },
//            delay: 1000,
//            limit: 50000,
//            scope: me
//        });
        
        me.callParent(arguments);
    }
//    ,
////    Helper methods
////    TODO: This should subscribe to a Parse channel
//    joinRoom: function(xSocket) {
//        var me = this;
//        if(X.config.Config.getDEBUG()) {
//            console.log('Debug: X.store.AuthenticatedUser.joinRoom(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//        }
//        
//        xSocket = Ext.isObject(xSocket) ? xSocket : X.Socket;
//        if(Ext.isObject(xSocket)) {
//            if (me.getAllCount() > 0) {
//                me.each(function(thisAuthenticatedUser) {
//                        thisAuthenticatedUser.joinRoom(xSocket);
//                    });
//            }
//            return me;
//        }
//        
//        return false;
//    }
});
