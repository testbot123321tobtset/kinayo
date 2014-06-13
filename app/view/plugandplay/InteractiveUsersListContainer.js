// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.InteractiveUsersListContainer', {
    singleton: true,
    extend: 'X.view.core.Container',
    requires: [
        'Ext.TitleBar',
        'X.view.plugandplay.InteractiveUsersList'
    ],
    xtype: 'interactiveuserslistcontainer',
    id: 'interactiveUsersListContainer',
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
        cls: 'interactive-users-list-container',
        floating: true,
        centered: true,
        fullscreen: true,
        modal: true,
        hidden: true,
        zIndex: X.config.Config.getZINDEX_LEVEL_1(),
        items: [
            {
                xtype: 'titlebar',
                itemId: 'interactiveUsersListContainerToolbar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-top x-full-width interactive-users-list-container-toolbar',
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                title: 'Contacts',
                items: [
                    {
                        itemId: 'backButton',
                        cls: 'button-stacked back-button',
                        iconCls: 'close',
                        text: 'Cancel',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#interactiveUsersListContainer').onBackButtonTap();
                            }
                        }
                    },
                    {
                        itemId: 'continueButton',
                        cls: 'button-stacked continue-button',
                        iconCls: 'checkmark',
                        text: 'Continue',
                        align: 'right',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#interactiveUsersListContainer').onContinueButtonTap();
                            }
                        }
                    }
                ]
            },
            {
                cls: 'tabbar-height-spacer-container'
            },
            {
                xtype: 'interactiveuserslist',
                flex: 1
            },
            {
                cls: 'tabbar-height-spacer-container'
            }
        ]
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        
        me.callParent(arguments);
        
        return me;
    },
    onContinueButtonTap: function(button, e, eOpts) {
        var me = this;
        
        me.callParent(arguments);
        
        return me;
    },
    close: function() {
        var me = this;
        
        me.resetTitle();
        me.resetList();
        
        return me.callParent(arguments);
    },
    setShine: function() {
        this.down('toolbar').addCls('shine');
    },
    setTitle: function(title) {
        var me = this;
        
        me.down('#interactiveUsersListContainerToolbar').setTitle(Ext.isString(title) ? title : 'Contacts');
        
        return me;
    },
    resetTitle: function() {
        var me = this;
        
        me.down('#interactiveUsersListContainerToolbar').setTitle('Contacts');
        
        return me;
    },
    resetList: function() {
        var me = this;
        
        me.down('#interactiveUsersList').deselectAll(true);
        
        return me;
    }
});