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
    }
});
