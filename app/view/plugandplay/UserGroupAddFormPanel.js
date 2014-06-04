Ext.define('X.view.plugandplay.UserGroupAddFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet'
    ],
    xtype: 'usergroupaddformpanel',
    id: 'userGroupAddFormPanel',
    config: {
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'user-group-add-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'groupAddTitleAndDescriptionFormFieldSet',
                cls: 'group-add-title-and-description-form-fieldset',
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        itemId: 'titleTextfield',
                        cls: 'title-textfield',
                        placeHolder: 'Title',
                        name: 'title'
                    },
                    {
                        itemId: 'descriptionTextfield',
                        cls: 'description-textfield',
                        placeHolder: 'Description',
                        name: 'description'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'groupAddMembersFormFieldSet',
                cls: 'group-add-members-form-fieldset',
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        itemId: 'titleXTextfield',
                        cls: 'title-textfield',
                        placeHolder: 'List all contacts here',
                        name: 'titleX'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'submitButton',
                cls: 'submit-button',
                text: 'Create'
            }
        ]
    },
    resetAllFields: function() {
        var me = this;
        me.resetTitleField().resetDescriptionField();
        return me;
    },
    resetTitleField: function() {
        var me = this;
        me.down('#titleTextfield').setValue('');
        return me;
    },
    resetDescriptionField: function() {
        var me = this;
        me.down('#descriptionTextfield').setValue('');
        return me;
    }
});