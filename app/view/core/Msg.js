Ext.define('X.view.core.Msg', {
    extend: 'X.view.core.Container',
    xtype: 'coremsg',
    id: 'coreMsg',
    statics: {
        OK: {
            itemId: 'ok',
            iconCls: 'checkmark',
            title: 'Ok'
        },
        YES: {
            itemId: 'yes',
            iconCls: 'checkmark',
            title: 'Yes'
        },
        NO: {
            itemId: 'no',
            iconCls: 'close',
            title: 'No'
        },
        CANCEL: {
            itemId: 'cancel',
            iconCls: 'close',
            title: 'Cancel'
        },
        INFO: Ext.baseCSSPrefix + 'msgbox-info',
        WARNING: Ext.baseCSSPrefix + 'msgbox-warning',
        QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
        ERROR: Ext.baseCSSPrefix + 'msgbox-error',
        OKCANCEL: [
            {text: 'Cancel', itemId: 'cancel'},
            {text: 'OK', itemId: 'ok', ui: 'action'}
        ],
        YESNOCANCEL: [
            {text: 'Cancel', itemId: 'cancel'},
            {text: 'No', itemId: 'no'},
            {text: 'Yes', itemId: 'yes', ui: 'action'}
        ],
        YESNO: [
            {
                itemId: 'yes',
                iconCls: 'checkmark',
                title: 'Yes'
            },
            {
                itemId: 'no',
                iconCls: 'close',
                title: 'No'
            }
        ]
    },
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
        cls: 'core-msg',
        floating: true,
        centered: true,
        fullscreen: true,
        modal: true,
        hidden: true,
        title: null,
        message: null,
        buttons: null,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-top x-full-width',
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                title: 'Edit'
            },
            {
                xtype: 'corecontainer',
                flex: 1,
                scrollable: true
            },
            {
                xtype: 'tabbar',
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    align: 'center'
                }
            }
        ]
    },
    updateTitle: function(newTitle) {
        var me = this;
        if(Ext.isString(newTitle)) {
            me.down('titlebar').setTitle(newTitle);
        }
        return me;
    },
    updateMessage: function(newMessage) {
        var me = this;
        if(Ext.isString(newMessage)) {
            me.down('corecontainer').setHtml(newMessage);
        }
        return me;
    },
    updateButtons: function(newButtons) {
        var me = this;
        if(Ext.isObject(newButtons)) {
            me.down('tabbar').add(newButtons);
        }
        return me;
    },
    confirm: function(title, message, fn, scope) {
        var me = this;
        me.setTitle(title || null);
        me.setMessage(message || null);
        me.setButtons(me.YESNO);
        
        //        Don't use open() here, because Ext.Msg is a singleton without an xtype, and open() relies on xtype
        //        Also, we set default config on Msg using Ext.Msg.defaultAllowedConfig.<> (see in Preflight)
        me.show();
    }
});
