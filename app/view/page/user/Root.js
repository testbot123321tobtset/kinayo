Ext.define('X.view.page.user.Root', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserGroupsTabPanel',
        'X.view.plugandplay.UserMoreTabPanel',
        'X.view.plugandplay.UserFriendFormPanel'
    ],
    xtype: 'pageuserroot',
    id: 'pageUserRoot',
    config: {
        cls: 'page-user-root',
        tabBarPosition: 'bottom',
        tabBar: {
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            }
        },
        
        items: [
//            {
//                layout: {
//                    type: 'vbox',
//                    pack: 'center',
//                    align: 'stretch'
//                },
//                itemId: 'userFriends',
//                cls: 'user-friends',
//                iconCls: 'groupsfilled',
//                title: 'Friends',
//                items: [
//                  {
//                      xtype: 'userfriendformpanel',
//                      flex: 1,
//                      scrollable: null
//                  }
//                ]
//            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userGroups',
                cls: 'user-groups',
                iconCls: 'chatbubblefilled',
                title: 'Chats',
                items: [
                    {
                        flex: 1,
                        xtype: 'usergroupstabpanel'
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userMore',
                cls: 'user-more',
                iconCls: 'dotdotdotfilled',
                title: 'More',
                items: [
                    {
                        flex: 1,
                        xtype: 'usermoretabpanel'
                    }
                ]
            }
        ]
    }
});
