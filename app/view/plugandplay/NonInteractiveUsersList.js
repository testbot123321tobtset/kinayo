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
        
        hidden: true,
        
        deferEmptyText: false
    },
    onInitialize: function(me) {
        
        //        Set empty text
        me.setEmptyText(X.config.Config.getMESSAGES().GROUP_NO_MEMBERS_FOUND);
    },
    open: function(animationConfig) {
        var me = this;
        
        me.show(animationConfig || X.config.Config.getSHOW_ANIMATION_CONFIG());
        
        return me;
    },
    close: function(animationConfig) {
        var me = this;
        
        me.hide(animationConfig || X.config.Config.getHIDE_ANIMATION_CONFIG());
        
        return me;
    }
});
