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
        
        itemTpl: '<tpl if="fullName">{fullName}<tpl else>{username}</tpl>',
        
        hidden: false,
        
        deferEmptyText: false
    },
    onInitialize: function(me) {
        
        //        Set empty text
        me.setEmptyText(X.config.Config.getMESSAGES().GROUP_NO_MEMBERS_FOUND);
        
        //        Set animations
        me.setShowAnimation(X.config.Config.getSHOW_ANIMATION_SLIDE_TO_LEFT_CONFIG());
        me.setHideAnimation(X.config.Config.getHIDE_ANIMATION_SLIDE_TO_RIGHT_CONFIG());
    }
});
