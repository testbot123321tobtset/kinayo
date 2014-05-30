Ext.define('X.view.plugandplay.UserGroupsList', {
    extend: 'Ext.dataview.List',
    xtype: 'usergroupslist',
    config: {
        itemId: 'userGroupsList',
        cls: 'user-groups-list',
        itemTpl: '{title}',
        deselectOnContainerClick: true,
        onItemDisclosure: true,
        items: [
            //            We need these spacers to make sure that when the list scrolls, it scrolls behind the tab bars but
            //            the top and the bottom portions of the list are still clickable when you scroll to either end
            {
                xtype: 'container',
                cls: 'tabbar-spacer',
                scrollDock: 'top'
            },
            {
                xtype: 'container',
                cls: 'tabbar-spacer',
                scrollDock: 'bottom'
            }
        ]
    }
});
