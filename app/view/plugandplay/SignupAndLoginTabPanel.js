Ext.define('X.view.plugandplay.SignupAndLoginTabPanel', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserLoginFormPanel',
        'X.view.plugandplay.UserSignupFormPanel'
    ],
    xtype: 'signupandlogintabpanel',
    id: 'signupAndLoginTabPanel',
    config: {
        cls: 'signup-and-login-tab-panel',
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
    },
    close: function() {
        var me = this;
        me.hide(X.config.Config.getHIDE_BY_POP_ANIMATION_CONFIG());
        return me;
    }
});
