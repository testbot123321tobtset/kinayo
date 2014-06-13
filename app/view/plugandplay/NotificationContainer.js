Ext.define('X.view.plugandplay.NotificationContainer', {
    singleton: true,
    extend: 'X.view.core.Container',
    requires: [
    ],
    xtype: 'notificationcontainer',
    id: 'notificationContainer',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'notification-container',
        floating: true,
        centered: false,
        fullscreen: false,
        
        modal: false,
        
        hidden: true,
        bottom: 0,
        
        items: {
            itemId: 'htmlContainer',
            html: 'Loading'
        }
    },
    onInitialize: function() {
        var me = this;
        
        me.setZIndex(X.config.Config.getZINDEX_LEVEL_5());
        
        return me;
    },
    setMessage: function(message) {
        var me = this;
        
        me.down('#htmlContainer').setHtml(Ext.isString(message) ? message : '');
        
        return me;
    },
    resetMessge: function() {
        var me = this;
        
        me.down('#htmlContainer').setHtml('');
        
        return me;
    },
    openAndWaitAndClose: function(message, duration) {
        var me = this;
        
        me.setMessage(message).open();
        
        Ext.Function.defer(function() {
            me.close();
        }, Ext.isNumber(duration) ? duration : 3000);
        
        return me;
    }
});
