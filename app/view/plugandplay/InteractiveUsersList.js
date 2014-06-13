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
        
        itemTpl: '<tpl if="fullName">{fullName}<tpl else>{username}</tpl>',
        
        hidden: false,
        
        deferEmptyText: false
    },
    onInitialize: function(me) {
        
        //        Set empty text
        me.setEmptyText(X.config.Config.getMESSAGES().GROUP_NO_MEMBERS_FOUND);
    }
});