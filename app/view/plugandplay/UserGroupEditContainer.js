// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.userGroupEditContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'X.view.plugandplay.UserGroupEditFormPanel',
        'X.view.plugandplay.UserGroupsList'
    ],
    xtype: 'usergroupeditcontainer',
    id: 'userGroupEditContainer',
    config: {
        // isWindow config just means what is explained in the beginning
        // This is an easy way to query for any and all windows and do
        // further processing with them. Usually this is used to hide all
        // of such windows
        isWindow: true,
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'user-edit-group-container',
        floating: true,
        centered: true,
        fullscreen: true,
        modal: true,
        hidden: true,
        items: [
            {
                xtype: 'titlebar',
                itemId: 'userGroupEditContainerToolbar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-top x-full-width user-edit-group-container-toolbar',
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                title: 'Edit',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        cls: 'button-stacked back-button',
                        iconCls: 'close',
                        text: 'Close',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userGroupEditContainer').onBackButtonTap(button, e, eOpts);
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'deleteButton',
                        cls: 'button-stacked delete-button',
                        align: 'right',
                        iconCls: 'minus',
                        text: 'Delete',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userGroupEditContainer').onDeleteButtonTap(button, e, eOpts);
                            }
                        }
                    }
//                    ,
//                    {
//                        xtype: 'button',
//                        itemId: 'removeMeSetButton',
//                        cls: 'button-stacked delete-button',
//                        align: 'right',
//                        iconCls: 'close',
//                        text: 'RO',
//                        listeners: {
//                            tap: function(button, e, eOpts) {
//                                button.up('#userGroupEditContainer').setReadOnly(true);
//                            }
//                        }
//                    },
//                    {
//                        xtype: 'button',
//                        itemId: 'removeMeResetButton',
//                        cls: 'button-stacked delete-button',
//                        align: 'right',
//                        iconCls: 'close',
//                        text: 'Reset RO',
//                        listeners: {
//                            tap: function(button, e, eOpts) {
//                                button.up('#userGroupEditContainer').setReadOnly(false);
//                            }
//                        }
//                    }
                ]
            },
            {
                xtype: 'usergroupeditformpanel',
                flex: 1,
                scrollable: true
            }
        ]
    },
    onShow: function() {
        var me = this;
        
        me.setTitleToGroupTitle();
        
        me.down('usergroupeditformpanel').setUsersListWithCurrentGroupMembers();
        
        return me.callParent(arguments);
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.callParent(arguments);
        return me;
    },
    onDeleteButtonTap: function(button, e, eOpts) {
        var me = this;
        me.down('usergroupeditformpanel').fireEvent('deletebuttontap', button, e);
        me.callParent(arguments);
        return me;
    },
    onUpdateData: function() {
        var me = this;
        me.setTitleToGroupTitle();
        me.callParent(arguments);
    },
    setTitleToGroupTitle: function() {
        var me = this;
        me.down('#userGroupEditContainerToolbar').setTitle(me.getRecord().get('title'));
        return me;
    },
    setReadOnly: function(isReadOnly) {
        var me = this;

        isReadOnly = Ext.isBoolean(isReadOnly) ? isReadOnly : false;
        if (isReadOnly) {
            me.down('#deleteButton').
                    hide();
        }
        else {
            me.down('#deleteButton').
                    show();
        }
        me.down('usergroupeditformpanel').
                setReadOnly(isReadOnly);

        return me;
    }
});