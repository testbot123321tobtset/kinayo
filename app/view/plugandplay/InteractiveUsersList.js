Ext.define('X.view.plugandplay.InteractiveUsersList', {
    extend: 'Ext.dataview.List',
    xtype: 'interactiveuserslist',
    config: {
        itemId: 'interactiveUsersList',
        cls: 'interactive-users-list',
        
        infinite: true,
        
        onItemDisclosure: true,
        mode: 'MULTI',
        
        scrollToTopOnRefresh: true,
        
        itemTpl: '{fullName}',
        
        hidden: true
    },
    open: function() {
        var me = this;
        
        me.show(X.config.Config.getSHOW_ANIMATION_CONFIG());
        
        return me;
    },
    close: function() {
        var me = this;
        
        me.hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        
        return me;
    }
});