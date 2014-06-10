Ext.define('X.view.plugandplay.NonInteractiveUsersList', {
    extend: 'Ext.dataview.List',
    xtype: 'noninteractiveuserslist',
    config: {
        itemId: 'nonInteractiveUsersList',
        cls: 'noninteractive-users-list',
        
        infinite: true,
        
        disableSelection: true,
        onItemDisclosure: false,
        
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
