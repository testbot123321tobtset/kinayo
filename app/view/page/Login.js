Ext.define('X.view.page.Login', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserLoginFormPanel',
        'X.view.plugandplay.UserSignupFormPanel'
    ],
    xtype: 'pagelogin',
    id: 'pageLogin',
    config: {
        cls: 'page-login',
        tabBarPosition: 'bottom',
        items: [
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userLogin',
                cls: 'user-login',
                iconCls: 'arrowright',
                title: 'Log in',
                items: [
                    {
                        flex: 1,
                        html: 'Logo Placeholder',
                        scrollable: null
                    },
                    {
                        xtype: 'userloginformpanel',
                        flex: 1,
                        scrollable: true
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userSignup',
                cls: 'user-signup',
                iconCls: 'add',
                title: 'Sign up',
                items: [
                    {
                        flex: 1,
                        html: 'Logo Placeholder',
                        scrollable: null
                    },
                    {
                        xtype: 'usersignupformpanel',
                        flex: 1,
                        scrollable: true
                    }
                ]
            }
        ]
    }
});
