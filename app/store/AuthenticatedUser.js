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
    },
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

//    This expects:
//    {
//      user: <'AuthenticatedUser' model instance>
//    }
    locallySetGivenUserAsAutheticatedUser: function(options) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.locallySetGivenUserAsAutheticatedUser(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(Ext.isObject(options)) {
            var user = ('user' in options && Ext.isObject(options.user) && !Ext.isEmpty(options.user)) ? options.user : false;
            if(Ext.isObject(user) && !Ext.isEmpty(user)) {
                me.each(function(thisUser) {
                    thisUser.destroy();
                    thisUser.commit();
                });
                me.add(user);
                user.commit();
                
                me.setSessionHeader(user.get('sessionToken'));
                me.setUrlPostfixEndpoint(user.get('objectId'));
                
                return me;
            }
        }
        
        return false;
    },
    setSessionHeader: function(sessionToken) {
        var me = this;
        
        var proxy = me.getProxy();
        var proxyHeaders = proxy.getHeaders();
        proxyHeaders['X-Parse-Session-Token'] = sessionToken;
        proxy.setHeaders(proxyHeaders);
        
        return me;
    },
    resetSessionHeader: function() {
        var me = this;
        
        var proxy = me.getProxy();
        var proxyHeaders = proxy.getHeaders();
        proxyHeaders['X-Parse-Session-Token'] = null;
        proxy.setHeaders(proxyHeaders);
        
        return me;
    },
    setUrlPostfixEndpoint: function(endpoint) {
        var me = this;
        
        me.getProxy().setUrl(X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT + '/' + endpoint);
        
        return me;
    },
    resetUrlPostfixEndpoint: function() {
        var me = this;
        
        me.getProxy().setUrl(X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT);
        
        return me;
    },
    reset: function() {
        var me = this;
        
        me.resetSessionHeader().resetUrlPostfixEndpoint();
        var authenticatedUser = me.getAt(0);
        if(Ext.isObject(authenticatedUser)) {
            authenticatedUser.destroy();
            authenticatedUser.commit();
        }
        
        return me;
    }
});
