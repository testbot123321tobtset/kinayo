Ext.define('X.view.plugandplay.UserGroupEditFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'X.view.core.Msg',
        'Ext.form.FieldSet',
        'Ext.dataview.List',
        'X.view.plugandplay.UserGroupsList'
    ],
    xtype: 'usergroupeditformpanel',
    id: 'userGroupEditFormPanel',
    config: {
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'user-group-edit-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'groupEditTitleAndDescriptionFormFieldSet',
                cls: 'group-edit-title-and-description-form-fieldset',
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
//            {
//                xtype: 'container',
//                itemId: 'groupEditMembersFormFieldSet',
//                cls: 'group-edit-members-form-fieldset',
//                defaults: {
//                    xtype: 'checkboxfield'
//                }
//            },
            {
                xtype: 'fieldset',
                itemId: 'usersListContainer',
                flex: 1,
                layout: 'fit',
                title: X.config.Config.getLABELS().SELECT_FRIENDS_TO_ADD_TO_GROUP
            }
//            ,
//            {
//                xtype: 'button',
//                itemId: 'deleteButton',
//                cls: 'delete-button',
//                text: 'Delete',
//                ui: 'decline'
//            }
        ],
        listeners: [
            {
                fn: 'onGroupDataEdit',
                event: 'change',
                delegate: '#titleTextfield',
                buffer: 1
            },
            {
                fn: 'onGroupDataEdit',
                event: 'change',
                delegate: '#descriptionTextfield',
                buffer: 1
            },
            {
                // This is fired from X.view.plugandplay.UserEditGroupContainer
                fn: 'onGroupDataDestroy',
                event: 'deletebuttontap',
                buffer: 1
            }
        ]
    },
    resetAllFields: function() {
        var me = this;
        me.resetTitleField().
                resetDescriptionField();
        return me;
    },
    resetTitleField: function() {
        var me = this;
        me.down('#titleTextfield').
                setValue('');
        return me;
    },
    resetDescriptionField: function() {
        var me = this;
        me.down('#descriptionTextfield').
                setValue('');
        return me;
    },
    onGroupDataEdit: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var groupRecord = me.getRecord();
        var groupRecordId = groupRecord.get('objectId');
        var fieldName = field.getName();
        var groupsStore = Ext.getStore('GroupsStore');
        var groupFromGroupsStore = groupsStore.getById(groupRecordId);
        var groupFieldValueFromGroupsStore = groupFromGroupsStore.get(fieldName);
        if (groupFieldValueFromGroupsStore !== newValue) {
            var formValues = me.getValues();
            formValues['createdById'] = groupRecord.get('createdById');
            var dummyGroupRecord = Ext.create('X.model.Group', formValues);
            dummyGroupRecord.set(fieldName, newValue);
            var errors = dummyGroupRecord.validate();
            if (!errors.isValid()) {
                me.setRecordRecursive(groupRecord);
                Ext.Viewport.fireEvent('editgroupvalidationfailed', {
                    errors: errors
                });
            }
            else {
                groupRecord.set(fieldName, newValue);
                Ext.Viewport.fireEvent('editgroup', {
                    group: groupRecord,
                    silent: true
                });
            }
            dummyGroupRecord.destroy();
        }
        return me;
    },
    onGroupDataDestroy: function(field, newValue, oldValue, eOpts) {
        var me = this;
        Ext.Msg.confirm(
                X.XConfig.getMESSAGES().MESSAGE_BOX_CONFIRM_TITLE,
                'Do you really want to delete ' + me.getRecord().
                get('title') + '?',
                function(buttonId, value) {
                    if (buttonId === 'yes') {
                        Ext.Viewport.fireEvent('destroygroup', {
                            group: me.getRecord(),
                            silent: false,
                            typeOfSave: 'destroy'
                        });
                    }
                }
        );
        return me;
    },
    setReadOnly: function(isReadOnly) {
        var me = this;
        
        isReadOnly = Ext.isBoolean(isReadOnly) ? isReadOnly : true;
        var fields = me.query('field');
        var noOfFieldsWithReadOnlyAttribute = fields.length;
        if (noOfFieldsWithReadOnlyAttribute > 0) {
            var fieldIndex = 0;
            for (; fieldIndex < noOfFieldsWithReadOnlyAttribute; fieldIndex++) {
                var thisField = fields[fieldIndex];
                if ('setReadOnly' in thisField) {
                    thisField.setReadOnly(isReadOnly);
                }
            }
        }
        var usersListContainer = me.down('#usersListContainer');
        if (Ext.isObject(usersListContainer)) {
            var listLabel = isReadOnly ? X.config.Config.getLABELS().SEE_FRIENDS_IN_THE_GROUP : X.config.Config.getLABELS().SELECT_FRIENDS_TO_ADD_TO_GROUP;
            usersListContainer.setTitle(listLabel);
        }
        
        return me;
    }
});