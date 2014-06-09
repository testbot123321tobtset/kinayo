Ext.define('X.view.plugandplay.SimpleFormPanelDisplayContainer', {
    extend: 'X.view.core.Container',
    requires: [
    ],
    xtype: 'simpleformpaneldisplaycontainer',
    config: {
        itemId: 'simpleFormPanelDisplayContainer',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'simple-formpanel-display-container'
    }
});
