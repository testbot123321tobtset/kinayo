Ext.define('X.view.plugandplay.UserGroupsTabPanel', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserGroupAddFormPanel',
        'X.view.plugandplay.UserGroupsList'
    ],
    xtype: 'usergroupstabpanel',
    id: 'userGroupsTabPanel',
    config: {
        cls: 'user-groups-tab-panel',
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
                // This will have the UI to first display all groups
                // then on click, will display group feed
                layout: {
                    type: 'fit'
                },
                itemId: 'userGroupFeeds',
                cls: 'user-group-feeds',
                iconCls: 'chatbubblefilled',
                title: 'Chats',
                items: [
                    {
                        xtype: 'usergroupslist'
                    }
                ]
            },
            {
                layout: {
                    type: 'fit'
                },
                itemId: 'userAddGroups',
                cls: 'user-add-groups',
                iconCls: 'plus',
                title: 'New Group',
                items: [
                    {
                        xtype: 'usergroupaddformpanel',
                        flex: 1
                    }
                ]
            }
        ]
    }
});
