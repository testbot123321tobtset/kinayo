// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.NonInteractiveUsersListContainer', {
    singleton: true,
    extend: 'X.view.core.Container',
    requires: [
        'Ext.TitleBar',
        'X.view.plugandplay.NonInteractiveUsersList'
    ],
    xtype: 'noninteractiveuserslistcontainer',
    id: 'nonInteractiveUsersListContainer',
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
        cls: 'noninteractive-users-list-container',
        floating: true,
        centered: true,
        fullscreen: true,
        modal: true,
        hidden: true,
        items: [
            {
                xtype: 'titlebar',
                itemId: 'nonInteractiveUsersListContainerToolbar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-top x-full-width noninteractive-users-list-container-toolbar',
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
                        text: 'Close',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#nonInteractiveUsersListContainer').onBackButtonTap();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'noninteractiveuserslist',
                flex: 1
            }
        ]
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.callParent(arguments);
        return me;
    },
    addShine: function() {
        this.down('titlebar').addCls('shine');
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
        
        me.down('#nonInteractiveUsersListContainerToolbar').setTitle(Ext.isString(title) ? title : 'Contacts');
        
        return me;
    },
    resetTitle: function() {
        var me = this;
        
        me.down('#nonInteractiveUsersListContainerToolbar').setTitle('Contacts');
        
        return me;
    },
    resetList: function() {
        var me = this;
        
        me.down('#nonInteractiveUsersList').deselectAll(true);
        
        return me;
    }
});