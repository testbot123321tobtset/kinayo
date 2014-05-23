Ext.define('X.view.plugandplay.UserLoginFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Hidden',
        'Ext.field.Email',
        'Ext.field.Password'
    ],
    xtype: 'userloginformpanel',
    id: 'userLoginFormPanel',
    config: {
        cls: 'user-login-form-panel',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'loginFormFieldSet',
                cls: 'login-form-fieldset',
                items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'usernameField',
                        cls: 'username-field',
                        name: 'username',
                        placeHolder: 'Username'
                    },
////                  App Store guidelines say that we can't make emails 
////                  mandatory – meaning that authentication by email 
////                  is out of the window. We should ask for a user's email
////                  as an optional thing in their profile UI
////                  Don't show this in the login UI
//                    {
//                        xtype: 'emailfield',
//                        itemId: 'emailField',
//                        cls: 'email-field',
//                        name: 'email',
//                        placeHolder: 'Email'
//                    },
//                    We will need to add the phone # field here
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordField',
                        cls: 'password-field',
                        name: 'password',
                        placeHolder: 'Password'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'submitButton',
                cls: 'submit-button',
                text: 'Log in',
                ui: 'confirm'
            }
        ]
    },
    resetLoginFields: function() {
        var me = this;
        me.resetUsernameField().resetPasswordField();
        return me;
    },
    resetUsernameField: function() {
        var me = this;
        me.down('#usernameField').setValue('');
        return me;
    },
    resetPasswordField: function() {
        var me = this;
        me.down('#passwordfield').setValue('');
        return me;
    }
});