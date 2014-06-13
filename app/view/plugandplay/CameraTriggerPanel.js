Ext.define('X.view.plugandplay.CameraTriggerPanel', {
    extend: 'X.view.core.Panel',
    requires: [
    ],
    xtype: 'cameratriggerpanel',
    id: 'cameraTriggerPanel',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        bottom: 0,
        left: 0,
        cls: 'camera-trigger-panel',
        zIndex: X.config.Config.getZINDEX_LEVEL_4(),
        items: [
            {
                xtype: 'tabbar',
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    {
                        itemId: 'cameraTriggerButton',
                        cls: 'camera-trigger-button',
                        iconCls: 'camerafilled',
                        title: 'Shoot',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#cameraTriggerPanel').onCameraTriggerButtonTap(button, e, eOpts);
                            }
                        }
                    }
                ]
            }
        ]
    },
    onCameraTriggerButtonInitialize: function(button, eOpts) {
        var me = this;
        me.element.on('doubletap', function(event, node, options, eOpts) {
            me.fireEvent('doubletap', me, event, node, options, eOpts);
        });
        return me;
    },
    onCameraTriggerButtonTap: function() {
        var me = this;
        me.close();
        return me;
    }
});