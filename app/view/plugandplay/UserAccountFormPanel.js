Ext.define('X.view.plugandplay.UserAccountFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Email'
    ],
    xtype: 'useraccountformpanel',
    id: 'userAccountFormPanel',
    config: {
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'user-account-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'accountFormFieldSet',
                cls: 'account-form-fieldset',
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        itemId: 'usernamefield',
                        cls: 'username-textfield',
                        placeHolder: 'Username',
                        name: 'username',
                        readOnly: true
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'phoneNumberNumberfield',
                        cls: 'phonenumber-numberfield',
                        placeHolder: 'Phone Number',
                        name: 'phoneNumber',
                        readOnly: true
                    },
                    {
                        itemId: 'firstNameTextfield',
                        cls: 'firstname-textfield',
                        placeHolder: 'First Name',
                        name: 'firstName'
                    },
                    {
                        itemId: 'lastNameTextfield',
                        cls: 'lastname-textfield',
                        placeHolder: 'Last Name',
                        name: 'lastName'
                    },
                    {
                        itemId: 'usernameEmailfield',
                        cls: 'username-emailfield',
                        placeHolder: 'Email',
                        name: 'usernameEmail'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'importFriendsFromDeviceContactsButton',
                        cls: 'import-friends-from-device-contacts-button',
                        text: 'Find Friends from your Contacts'
                    },
                    {
                        xtype: 'button',
                        itemId: 'logoutButton',
                        cls: 'logout-button',
                        text: 'Log out'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#firstNameTextfield',
                buffer: 1
            },
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#lastNameTextfield',
                buffer: 1
            },
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#usernameEmailfield',
                buffer: 1
            }
        ]
    },
    onUserRecordChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        
        var authenticatedUser = X.authenticatedUser;
        var fieldName = field.getName();
        var authenticatedUserFieldValue = authenticatedUser.get(fieldName);
        if(authenticatedUserFieldValue !== newValue) {
            authenticatedUser.set(fieldName, newValue);
            Ext.Viewport.fireEvent('authenticateduserdataedit', {
                silent: true,
                authenticatedUser: authenticatedUser
            });
        }
        
        return me;
    }
});