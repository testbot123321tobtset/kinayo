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
        
        itemTpl: '{formattedName}',
        
        showAnimation: X.config.Config.getSHOW_ANIMATION_CONFIG(),
        hideAnimation: X.config.Config.getHIDE_ANIMATION_CONFIG()
    }
});
