Ext.define('X.view.plugandplay.DeviceContactsUsersList', {
    extend: 'X.view.plugandplay.UsersList',
    xtype: 'devicecontactsuserslist',
    config: {
        itemId: 'deviceContactsUsersList',
        cls: 'device-contacts-users-list',
        itemTpl: '{formattedName}'
    }
});
