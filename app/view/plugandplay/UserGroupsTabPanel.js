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
//            We don't yet have a good use case for why we should have this UI
//            Since for now, we only have the user chat by forming groups, its not that
//            we could tap on a user in this UI and start chatting with her. This is
//            definitely something we should look into in future
//            {
//                // This will display all contacts that the user can interact with
//                // on our app. This list is determined using the phone numbers
//                // we have registered with us
//                layout: {
//                    type: 'fit'
//                },
//                itemId: 'userContacts',
//                cls: 'user-contacts',
//                iconCls: 'contactfilled',
//                title: 'Contacts',
//                scrollable: true,
//                items: [
//                    {
//                        xtype: 'userslist'
//                    }
//                ]
//            },
            {
                // This will have the UI to first display all groups
                // then on click, will display group feed
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userGroupFeeds',
                cls: 'user-group-feeds',
                iconCls: 'groupsfilled',
                title: 'Groups',
                
                height: '100%',
                scrollable: false,
                
                items: [
                    {
                        xtype: 'usergroupslist',
                        flex: 1
                    },
                    {
                        cls: 'tabbar-height-spacer-container'
                    },
                    {
                        cls: 'tabbar-height-spacer-container'
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
                        xtype: 'usergroupaddformpanel'
                    }
                ]
            }
        ]
    }
});
