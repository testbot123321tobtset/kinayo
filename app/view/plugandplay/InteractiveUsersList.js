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
        
        itemTpl: '{formattedName}'
    }
});