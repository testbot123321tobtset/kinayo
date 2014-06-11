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