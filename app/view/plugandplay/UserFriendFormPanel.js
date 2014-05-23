Ext.define('X.view.plugandplay.UserFriendFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email'
    ],
    xtype: 'userfriendformpanel',
    id: 'userFriendFormPanel',
    config: {
        cls: 'user-friend-form-panel',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'friendFormFieldSet',
                cls: 'friend-form-fieldset',
                items: [
                    {
                        xtype: 'emailfield',
                        itemId: 'friendEmailField',
                        cls: 'friend-emailfield',
                        name: 'friendEmailField',
                        placeHolder: 'Friend\'s Email'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'submitButton',
                cls: 'submit-button',
                text: 'submit',
                ui: 'confirm'
            }
        ]
    }
});
