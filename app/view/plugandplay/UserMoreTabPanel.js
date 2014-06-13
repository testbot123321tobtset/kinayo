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
            top: 0,
            cls: 'x-stretched x-docked-bottom x-docked-bottom-that-is-top x-full-width',
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            }
        },
        items: [
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userAccount',
                cls: 'user-account',
                iconCls: 'userfilled',
                title: 'Account',
                items: [
                    {
                        xtype: 'corecontainer',
                        cls: 'tabbar-height-spacer-container'
                    },
                    {
                        xtype: 'useraccountformpanel',
                        flex: 1
                    }
                ]
            }
        ]
    }
});
