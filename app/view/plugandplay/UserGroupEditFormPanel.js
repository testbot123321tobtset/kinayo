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
        
        height: '100%',
        scrollable: null,
        
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
                    }
//                    ,
//                    {
//                        itemId: 'descriptionTextfield',
//                        cls: 'description-textfield',
//                        placeHolder: 'Description',
//                        name: 'description'
//                    }
                ]
            },
            {
                xtype: 'simpleformpaneldisplaycontainer',
                html: 'Pick Group Members'
            },
            {
                xtype: 'interactiveuserslist',
                flex: 1
            }
            
            
            
            
            
            
//            {
//                xtype: 'fieldset',
//                itemId: 'groupEditTitleAndDescriptionFormFieldSet',
//                cls: 'group-edit-title-and-description-form-fieldset',
//                defaults: {
//                    xtype: 'textfield'
//                },
//                items: [
//                    {
//                        itemId: 'titleTextfield',
//                        cls: 'title-textfield',
//                        placeHolder: 'Title',
//                        name: 'title'
//                    },
//                    {
//                        itemId: 'descriptionTextfield',
//                        cls: 'description-textfield',
//                        placeHolder: 'Description',
//                        name: 'description'
//                    }
//                ]
//            },
//            {
//                xtype: 'fieldset',
//                items: {
//                    xtype: 'button',
//                    itemId: 'selectContactsButton',
//                    cls: 'select-contacts-button',
//                    text: 'Pick Group Members'
//                }
//            },
//            {
//                xtype: 'corecontainer',
//                itemId: 'usersListContainer',
//                cls: 'users-list-container',
//                flex: 1
//            }
            
            
            
            
            
            
            //            {
            //                xtype: 'container',
            //                itemId: 'groupEditMembersFormFieldSet',
            //                cls: 'group-edit-members-form-fieldset',
            //                defaults: {
            //                    xtype: 'checkboxfield'
            //                }
            //            },
            //            {
            //                xtype: 'fieldset',
            //                itemId: 'usersListContainer',
            //                flex: 1,
            //                layout: 'fit',
            //                title: X.config.Config.getLABELS().SELECT_FRIENDS_TO_ADD_TO_GROUP
            //            }
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
            //            {
            //                fn: 'onGroupDataEdit',
            //                event: 'change',
            //                delegate: '#descriptionTextfield',
            //                buffer: 1
            //            },
            {
                // This is fired from X.view.plugandplay.UserGroupEditContainer
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
                    validated: true,
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

//        isReadOnly = Ext.isBoolean(isReadOnly) ? isReadOnly : true;
//        var fields = me.query('field');
//        var noOfFieldsWithReadOnlyAttribute = fields.length;
//        if (noOfFieldsWithReadOnlyAttribute > 0) {
//            var fieldIndex = 0;
//            for (; fieldIndex < noOfFieldsWithReadOnlyAttribute; fieldIndex++) {
//                var thisField = fields[fieldIndex];
//                if ('setReadOnly' in thisField) {
//                    thisField.setReadOnly(isReadOnly);
//                }
//            }
//        }
//        var usersListContainer = me.down('#usersListContainer');
//        if (Ext.isObject(usersListContainer)) {
//            var listLabel = isReadOnly ? X.config.Config.getLABELS().SEE_FRIENDS_IN_THE_GROUP : X.config.Config.getLABELS().SELECT_FRIENDS_TO_ADD_TO_GROUP;
//            usersListContainer.setTitle(listLabel);
//        }

        me.disable();

        return me;
    },
    setUsersListWithCurrentGroupMembers: function() {
        var me = this;
        
        console.log('>>>>>>>>>>>>>>>>');

        var thisGroup = me.getRecord();
        thisGroup = (Ext.isObject(thisGroup) && !Ext.isEmpty(thisGroup)) ? thisGroup : false;
        if(thisGroup) {
            
            console.log('>>>>>>>>>>>>>>>>');
            
            var usersListContainer = me.down('#usersListContainer');
            usersListContainer = (Ext.isObject(usersListContainer) && !Ext.isEmpty(usersListContainer)) ? usersListContainer : false;
            if (usersListContainer) {
                
                console.log('>>>>>>>>>>>>>>>>');
                
                var usersList = usersListContainer.down('noninteractiveuserslist');
                usersList = (Ext.isObject(usersList) && !Ext.isEmpty(usersList)) ? usersList : false;
                if (!usersList) {
                    
                    console.log('!!!!!!!!!!!!!!');

                    usersList = Ext.create('widget.noninteractiveuserslist', {
                        emptyText: 'There are no members in this group. Consider adding a few and get chatty!'
                    });
                }
                if(usersList) {
                    
                    var usersListStore = usersList.getStore();
                    usersListStore = Ext.isObject(usersListStore) ? usersListStore : false;
                    if (!usersListStore) {

                        console.log('&&&&&&&&&&&&&&&&');

                        usersListStore = Ext.create('Ext.data.Store', {
                            model: 'X.model.DeviceContact',
                            storeId: 'UserGroupEditFormPanelUsersListStore',
                            proxy: 'memory',
                            reader: {
                                type: 'json',
                                rootProperty: ''
                            }
                        });
                    }
                    if (usersListStore) {
                        
                        console.log('>>>>>>>>>>>>>>>>');
                        console.log(usersListStore);
                        
                        //                Group members should really be the existing group members we get from Parse
                        //                The code will likely do thisGroup.getMembers() as a store or get the
                        //                data directly by doing thisGroup.getMembers().getData() or something like that
                        //                Figure out later; for now lets just use the device contacts store
                        var deviceContactStore = Ext.getStore('DeviceContactStore');
                        if (Ext.isObject(deviceContactStore)) {

                            console.log('>>>>>>>>>>>>>>>>');

                            var groupMembers = deviceContactStore.
                                    getData();
//                            usersListStore.setData(groupMembers);

                            console.log('**************');
                            console.log(groupMembers);

//                            usersList.setStore(usersListStore);

                            return me;
                        }
                    }
                }
            }
        }

        return false;;
    }
});