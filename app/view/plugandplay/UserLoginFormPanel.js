Ext.define('X.view.plugandplay.UserLoginFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
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
                        xtype: 'textfield',
                        itemId: 'usernameField',
                        cls: 'username-field',
                        name: 'username',
                        placeHolder: 'Username'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordField',
                        cls: 'password-field',
                        name: 'password',
                        placeHolder: 'Password'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'phoneNumberNumberfield',
                        cls: 'phonenumber-numberfield',
                        placeHolder: 'Phone Number',
                        name: 'phoneNumber'
                    },
                    {
                        xtype: 'label',
                        html: 'The phone number you enter above must be this device\'s phone number with country code. Enter only numbers.'
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
    resetAllFields: function() {
        var me = this;
        me.resetUsernameField().resetPasswordField().resetPhoneNumberField();
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
    },
    resetPhoneNumberField: function() {
        var me = this;
        me.down('#phoneNumberNumberfield').setValue('');
        return me;
    }
});