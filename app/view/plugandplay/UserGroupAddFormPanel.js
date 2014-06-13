Ext.define('X.view.plugandplay.UserGroupAddFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'X.view.plugandplay.SimpleFormPanelDisplayContainer'
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
            //            {
            //                xtype: 'fieldset',
            //                items: {
            //                    xtype: 'button',
            //                    itemId: 'submitButton',
            //                    cls: 'submit-button',
            //                    text: 'Create'
            //                }
            //            },
            
            
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
                        name: 'title',
                        hasChangedOnce: false,
                        placeHolder: 'Name your Group'
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
                xtype: 'fieldset',
                itemId: 'submitButtonFieldset',
                items: {
                    xtype: 'button',
                    itemId: 'submitButton',
                    cls: 'submit-button',
                    text: 'Create'
                }
            },
            {
                xtype: 'simpleformpaneldisplaycontainer',
                html: 'Pick Group Members',
                
                hidden: true
            },
            {
                xtype: 'interactiveuserslist',
                flex: 1,
                
                hidden: true
            }
            
            
            
            
//            {
//                xtype: 'corecontainer',
//                flex: 1,
//                scrollable: true,
//                layout: {
//                    type: 'vbox',
//                    pack: 'start',
//                    align: 'stretch'
//                },
//                items: [
//                    {
//                        xtype: 'fieldset',
//                        itemId: 'groupAddTitleAndDescriptionFormFieldSet',
//                        cls: 'group-add-title-and-description-form-fieldset',
//                        defaults: {
//                            xtype: 'textfield'
//                        },
//                        items: [
//                            {
//                                itemId: 'titleTextfield',
//                                cls: 'title-textfield',
//                                name: 'title',
//                                hasChangedOnce: false,
//                                placeHolder: 'Name your Group'
//                            }
//                            //                    ,
//                            //                    {
//                            //                        itemId: 'descriptionTextfield',
//                            //                        cls: 'description-textfield',
//                            //                        placeHolder: 'Description',
//                            //                        name: 'description'
//                            //                    }
//                        ]
//                    },
//                    {
//                        xtype: 'fieldset',
//                        items: {
//                            xtype: 'button',
//                            itemId: 'submitButton',
//                            cls: 'submit-button',
//                            text: 'Create'
//                        }
//                    },
//                    {
//                        xtype: 'simpleformpaneldisplaycontainer',
//                        html: 'Pick Group Members',
//                        hidden: true
//                    },
//                    {
//                        xtype: 'interactiveuserslist',
//                        flex: 1,
//                        hidden: true
//                    }
//                ]
//            }
            
            
            
            
            
            
            
            
            //            ,
            //            {
            //                xtype: 'button',
            //                height: '2.1em',
            //                itemId: 'submitButton',
            //                cls: 'submit-button',
            //                text: 'Create'
            //            }
            //            {
            //                xtype: 'fieldset',
            //                items: [
            ////                    {
            ////                        xtype: 'button',
            ////                        itemId: 'selectContactsButton',
            ////                        cls: 'select-contacts-button',
            ////                        text: 'Pick Group Members'
            ////                    },
            //                    {
            //                        xtype: 'button',
            //                        itemId: 'submitButton',
            //                        cls: 'submit-button',
            //                        text: 'Create'
            //                    }
            //                ]
            //            }
        ],
        listeners: [
            {
                fn: 'onFormPanelFieldChange',
                event: 'change',
                delegate: '#titleTextfield',
                buffer: 1
            },
            {
                fn: 'onInteractiveListItemTap',
                event: 'itemtap',
                delegate: 'interactiveuserslist',
                buffer: 1
            },
            {
                fn: 'onRemovedRecord',
                event: 'removedrecord',
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
    onRemovedRecord: function(me, record) {
        var me = this;

        me.down('#titleTextfield').hasChangedOnce = false;

        return me;
    },
    openList: function() {
        var me = this;

        me.down('#submitButtonFieldset').
                close(X.config.Config.getHIDE_ANIMATION_FADE_CONFIG());

        Ext.Function.defer(function() {

            me.down('simpleformpaneldisplaycontainer').
                    open();
            me.down('interactiveuserslist').
                    open();

        }, 2.6 * X.config.Config.getDEFAULT_ANIMATION_DELAY());

        return me;
    },
    closeList: function() {
        var me = this;

        me.down('#submitButtonFieldset').
                open();
        me.down('simpleformpaneldisplaycontainer').
                close();
        me.down('interactiveuserslist').
                close();

        return me;
    },
    onInteractiveListItemTap: function(me, index, target, record, e, eOpts) {
        var isDebug = X.config.Config.getDEBUG();
        if (isDebug) {
            console.log('Debug: X.view.plugandplay.UserGroupAddFormPanel.onInteractiveListItemTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var formPanel = me.up('#userGroupAddFormPanel');
        formPanel = (Ext.isObject(formPanel) && !Ext.isEmpty(formPanel)) ? formPanel : false;
        if (formPanel) {

            var groupRecord = formPanel.getRecord();
            groupRecord = (Ext.isObject(groupRecord) && !Ext.isEmpty(groupRecord)) ? groupRecord : false;
            if (groupRecord) {

                var formValues = formPanel.getValues();
                formValues['createdById'] = groupRecord.get('createdById');
                var dummyGroupRecord = Ext.create('X.model.Group', formValues);

                dummyGroupRecord.setHasMemberUsersFieldForGivenUsers(me.getSelection());

                var errors = dummyGroupRecord.validate();
                if (!errors.isValid()) {

                    me.select(groupRecord.getMembers(), false, true);

                    Ext.Viewport.fireEvent('editgroupvalidationfailed', {
                        errors: errors
                    });
                }
                else {

                    groupRecord.setHasMemberUsersFieldForGivenUsers(me.getSelection());

                    Ext.Viewport.fireEvent('editgroup', {
                        group: groupRecord,
                        validated: true,
                        silent: true
                    });
                }
                dummyGroupRecord.destroy();
            }
        }

        return me;
    },
    onFormPanelFieldChange: function(me, newValue, oldValue, eOpts) {
        var isDebug = X.config.Config.getDEBUG();
        if (isDebug) {
            console.log('Debug: X.view.plugandplay.UserGroupAddFormPanel.onFormPanelFieldChange(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var isThisGroupBeingCreated = !me.hasChangedOnce;

        if (isThisGroupBeingCreated) {

            //            This means that group is being created

            var groupsStore = Ext.getStore('GroupsStore');
            groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
            if (groupsStore) {

                var formPanel = me.up('#userGroupAddFormPanel');
                var formData = formPanel.getValues();
                var title = formData.title;
                var description = formData.description;

                var newGroup = {
                    title: title,
                    description: description,
                    createdById: X.authenticatedUser.get('objectId')
                };

                var group = Ext.create('X.model.Group', newGroup);

                var userGroupAddFormPanelUserList = formPanel.down('interactiveuserslist');
                userGroupAddFormPanelUserList = (Ext.isObject(userGroupAddFormPanelUserList) && !Ext.isEmpty(userGroupAddFormPanelUserList)) ? userGroupAddFormPanelUserList : false;
                if (userGroupAddFormPanelUserList) {

                    var selectedRecords = userGroupAddFormPanelUserList.getSelection();
                    selectedRecords = (Ext.isArray(selectedRecords) && !Ext.isEmpty(selectedRecords)) ? selectedRecords : false;
                    if (selectedRecords) {

                        group.setHasMemberUsersFieldForGivenUsers(userGroupAddFormPanelUserList.getSelection());
                    }
                }

                var errors = group.validate();
                if (!errors.isValid()) {

                    formPanel.setRecord(group);

                    if (userGroupAddFormPanelUserList) {

                        var friendsStore = Ext.getStore('FriendsStore');
                        friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                        if (friendsStore) {

                            userGroupAddFormPanelUserList.setStore(friendsStore);
                        }
                    }
                }
                else {
                    if (isDebug) {
                        console.log('Debug: X.view.plugandplay.UserGroupAddFormPanel.onFormPanelFieldChange(): Will create new group: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }

                    var groupsStore = Ext.getStore('GroupsStore');
                    groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
                    if (groupsStore) {

                        groupsStore.add(group);
                    }

                    formPanel.setRecord(group);

                    Ext.Viewport.fireEvent('addgroup', {
                        group: group,
                        validated: true,
                        silent: true,
                        showLoading: false,
                        callback: {
                            fn: function() {

                                Ext.Viewport.notificationContainer.openAndWaitAndClose('Created ' + title);

                                if (!me.hasChangedOnce) {

                                    me.hasChangedOnce = true;
                                }
                                
                                if (userGroupAddFormPanelUserList) {
                                    
                                    var friendsStore = Ext.getStore('FriendsStore');
                                    friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                                    if (friendsStore) {

                                        userGroupAddFormPanelUserList.setStore(friendsStore);
                                        
                                        formPanel.openList();
                                    }
                                }
                            },
                            scope: me
                        }
                    });
                }
            }
        }
        else {

            //            This means that group is being updated

            var formPanel = me.up('#userGroupAddFormPanel');

            var groupRecord = formPanel.getRecord();
            groupRecord = (Ext.isObject(groupRecord) && !Ext.isEmpty(groupRecord)) ? groupRecord : false;

            if (groupRecord) {

                var field = me;
                var groupRecordId = groupRecord.get('objectId');
                var fieldName = field.getName();
                var groupsStore = Ext.getStore('GroupsStore');
                var groupFromGroupsStore = groupsStore.getById(groupRecordId);
                var groupFieldValueFromGroupsStore = groupFromGroupsStore.get(fieldName);

                if (groupFieldValueFromGroupsStore !== newValue) {

                    var formValues = formPanel.getValues();
                    formValues['createdById'] = groupRecord.get('createdById');
                    var dummyGroupRecord = Ext.create('X.model.Group', formValues);
                    dummyGroupRecord.set(fieldName, newValue);

                    var usersList = formPanel.down('interactiveuserslist');
                    usersList = (Ext.isObject(usersList) && !Ext.isEmpty(usersList)) ? usersList : false;
                    if (usersList) {

                        dummyGroupRecord.setHasMemberUsersFieldForGivenUsers(usersList.getSelection());
                    }

                    var errors = dummyGroupRecord.validate();
                    if (!errors.isValid()) {

                        formPanel.setRecord(groupRecord);

                        Ext.Viewport.fireEvent('editgroupvalidationfailed', {
                            errors: errors
                        });
                    }
                    else {
                        if (isDebug) {
                            console.log('Debug: X.view.plugandplay.UserGroupAddFormPanel.onFormPanelFieldChange(): Will edit group: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }

                        groupRecord.set(fieldName, newValue);
                        groupRecord.setHasMemberUsersFieldForGivenUsers(usersList.getSelection());

                        Ext.Viewport.fireEvent('editgroup', {
                            group: groupRecord,
                            validated: true,
                            silent: true,
                            showLoading: false
                        });
                    }
                    dummyGroupRecord.destroy();
                }
            }
        }

        return me;
    }
});