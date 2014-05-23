Ext.define('X.view.plugandplay.UserGroupsList', {
    extend: 'Ext.dataview.List',
    xtype: 'usergroupslist',
    config: {
        itemId: 'userGroupsList',
        cls: 'user-groups-list',
        itemTpl: '{title}',
        deselectOnContainerClick: true,
        onItemDisclosure: true
    }
});
