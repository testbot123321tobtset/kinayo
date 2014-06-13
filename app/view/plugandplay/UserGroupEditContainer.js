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
                ]
            },
            {
                xtype: 'corecontainer',
                cls: 'tabbar-height-spacer-container'
            },
            {
                xtype: 'usergroupeditformpanel',
                flex: 1,
                scrollable: true,
                
                hidden: true
            }
        ]
    },
    openFullScreen: function(animationConfig) {
        var me = this;
        
        Ext.Function.defer(function() {
            
            me.down('usergroupeditformpanel').open(animationConfig);
        
        }, X.config.Config.getDEFAULT_ANIMATION_DELAY());
        
        return me.callParent(arguments);
    },
    close: function(animationConfig) {
        var me = this;
        
        me.down('usergroupeditformpanel').close(animationConfig);
        
        Ext.Function.defer(function() {
            
            me.resetTitle();
        
        }, 4 * X.config.Config.getDEFAULT_ANIMATION_DELAY());
        
        return me.callParent(arguments);
    },
    onDeleteButtonTap: function(button, e, eOpts) {
        var me = this;
        
        me.down('usergroupeditformpanel').fireEvent('deletebuttontap', button, e);
        
        return me.callParent(arguments);
    },
    onUpdateData: function() {
        var me = this;
        
        me.setTitleToGroupTitle();
        
        return me.callParent(arguments);
    },
    resetTitle: function() {
        var me = this;
        
        me.down('#userGroupEditContainerToolbar').setTitle('Edit');
        
        return me;
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