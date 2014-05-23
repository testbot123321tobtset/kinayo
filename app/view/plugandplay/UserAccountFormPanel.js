Ext.define('X.view.plugandplay.UserAccountFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
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
                        name: 'usernameEmail',
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'importFriendsFromDeviceContactsButton',
                cls: 'import-friends-from-device-contacts-button',
                text: 'Find Friends from your Contacts',
                ui: 'confirm'
            },
            {
                xtype: 'button',
                itemId: 'logoutButton',
                cls: 'logout-button',
                text: 'Log out',
                ui: 'decline'
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
                delegate: '#usernameEmail',
                buffer: 1
            }
        ]
    },
    onUserRecordChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var authenticatedEntity = X.authenticatedEntity;
        var fieldName = field.getName();
        var authenticatedEntityFieldValue = authenticatedEntity.get(fieldName);
        if(authenticatedEntityFieldValue !== newValue) {
            authenticatedEntity.set(fieldName, newValue);
            Ext.Viewport.fireEvent('authenticateduserdataedit', {
                silent: true
            });
        }
    }
});