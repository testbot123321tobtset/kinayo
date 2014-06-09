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
        
        height: '100%',
        scrollable: false,
        
        cls: 'user-group-add-form-panel',
        items: [
            {
                xtype: 'fieldset',
                items: {
                    xtype: 'button',
                    itemId: 'submitButton',
                    cls: 'submit-button',
                    text: 'Create'
                }
            },
            {
                xtype: 'corecontainer',
                flex: 1,
                scrollable: true,
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
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
                                name: 'title',
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
                        xtype: 'simpleformpaneldisplaycontainer',
                        html: 'Pick Group Members'
                    },
                    {
                        xtype: 'interactiveuserslist',
                        flex: 1
                    }
                ]
            }
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
    }
});