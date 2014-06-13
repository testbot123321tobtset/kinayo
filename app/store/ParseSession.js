Ext.define('X.store.ParseSession', {
    extend: 'Ext.data.Store',
    config: {
        model: 'X.model.ParseSession',
        storeId: 'ParseSessionStore',
        autoLoad: true,
        autoSync: true
    },
    getToken: function() {
        var me = this;
        
        if(me.getAllCount() > 0) {
            return me.getAt(0).get('token');
        }
        
        return false;
    },
    setToken: function(token) {
        var me = this;
        
        if(Ext.isObject(token) && !Ext.isEmpty(token)) {
            token = Ext.encode(token);
        }
        if(Ext.isString(token) && !Ext.isEmpty(token)) {
            var currentToken = me.getToken();
            if (Ext.isString(currentToken) && !Ext.isEmpty(currentToken)) {
                me.getAt(0).
                        set('token', token);
            }
            else {
                me.add({
                    token: token
                });
            }
            return me;
        }
        
        return false;
    },
    getSession: function() {
        var me = this;
        
        var token = me.getToken();
        if(Ext.isString(token) && !Ext.isEmpty(token)) {
            var tokenObject = Ext.decode(token);
            if(Ext.isObject(tokenObject) && !Ext.isEmpty(tokenObject)) {
                var sessionToken = ('sessionToken' in tokenObject && Ext.isString(tokenObject.sessionToken) && !Ext.isEmpty(tokenObject.sessionToken)) ? tokenObject.sessionToken : false;
                if(sessionToken) {
                    var userId = ('userId' in tokenObject && Ext.isString(tokenObject.userId) && !Ext.isEmpty(tokenObject.userId)) ? tokenObject.userId : false;
                    if(userId) {
                        return {
                            sessionToken: sessionToken,
                            userId: userId
                        };
                    }
                }
            }
        }
        
        return false;
    },
//    This expects an options object with the following keys:
//    1. userId
//    2. sessionToken
    setSession: function(options) {
        var me = this;
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(options) {
            var sessionToken = ('sessionToken' in options && Ext.isString(options.sessionToken) && !Ext.isEmpty(options.sessionToken)) ? options.sessionToken : false;
            if (sessionToken) {
                var userId = ('userId' in options && Ext.isString(options.userId) && !Ext.isEmpty(options.userId)) ? options.userId : false;
                if (userId) {
                    
                    return me.setToken({
                        sessionToken: sessionToken,
                        userId: userId
                    });
                }
            }
        }
        
        return false;
    },
    reset: function() {
        var me = this;
        
        me.removeAll();
        
        return me;
    }
});
