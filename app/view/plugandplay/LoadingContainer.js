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
    setHtml: function(html) {
        var me = this;
        
        html = Ext.isString(html) ? html : '';
        me.down('#htmlContainer').setHtml(html);
        
        return me;
    },
    resetHtml: function() {
        var me = this;
        
        me.show(me.down('#htmlContainer').setHtml(''));
        
        return me;
    },
    open: function(html) {
        var me = this;
        
        if(Ext.isString(html)) {
            
            me.setHtml(html);
        }
            
        me.show(X.config.Config.getSHOW_ANIMATION_CONFIG_FOR_NOTIFICATION());
        
        return me;
    },
    close: function() {
        var me = this;
        
        me.hide(X.config.Config.getHIDE_ANIMATION_CONFIG_FOR_NOTIFICATION());
        
        return me;
    }
});
