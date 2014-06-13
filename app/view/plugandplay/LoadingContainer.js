Ext.define('X.view.plugandplay.LoadingContainer', {
    singleton: true,
    extend: 'X.view.core.Container',
    requires: [
    ],
    xtype: 'loadingcontainer',
    id: 'loadingContainer',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'loading-container',
        floating: true,
        centered: false,
        fullscreen: false,
        
        modal: true,
        
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
    resetMessage: function() {
        var me = this;
        
        me.down('#htmlContainer').setHtml('');
        
        return me;
    }
});
