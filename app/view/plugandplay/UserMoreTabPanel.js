Ext.define('X.view.plugandplay.UserMoreTabPanel', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserAccountFormPanel'
    ],
    xtype: 'usermoretabpanel',
    id: 'userMoreTabPanel',
    config: {
        cls: 'user-more-tab-panel',
        tabBarPosition: 'top',
        tabBar: {
            docked: 'top',
            cls: 'x-stretched x-docked-bottom x-docked-bottom-that-is-top x-full-width',
            top: 0,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            }
        },
        items: [
            {
                layout: {
                    type: 'fit'
                },
                itemId: 'userAccount',
                cls: 'user-account',
                iconCls: 'userfilled',
                title: 'Account',
                items: [
                    {
                        xtype: 'useraccountformpanel',
                        flex: 1
                    }
                ]
            }
//            ,
//            {
//                layout: {
//                    type: 'vbox',
//                    pack: 'center',
//                    align: 'stretch'
//                },
//                itemId: 'userLogout',
//                cls: 'user-logout',
//                title: 'Log out',
//                items: {
//                    xtype: 'button',
//                    itemId: 'logoutButton',
//                    cls: 'logout-button',
//                    text: 'Log out',
//                    ui: 'decline'
//                }
//            }
        ]
    }
});
