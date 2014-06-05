Ext.define('X.view.plugandplay.LoadingContainer', {
    singleton: true,
    extend: 'X.view.core.Container',
    requires: [
    ],
    xtype: 'loadingcontainer',
    id: 'loadingContainer',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'loading-container',
        floating: true,
        centered: false,
        fullscreen: false,
        modal: true,
        hidden: true,
        bottom: 0,
        right: 0,
        showAnimation: X.config.Config.getSHOW_ANIMATION_CONFIG(),
        hideAnimation: X.config.Config.getHIDE_ANIMATION_CONFIG(),
        zIndex: X.config.Config.getZINDEX_LEVEL_5(),
        
        items: {
            html: 'Loading'
        }
    }
});
