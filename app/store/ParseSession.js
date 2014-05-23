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
        
        if(Ext.isString(token) && token.length > 0) {
            var currentToken = me.getToken();
            if (Ext.isString(currentToken) && currentToken.length > 0) {
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
    }
});
