// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.SignupAndLoginContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'X.view.plugandplay.SignupAndLoginTabPanel'
    ],
    xtype: 'signupandlogincontainer',
    id: 'signupAndLoginContainer',
    config: {
        // isWindow config just means what is explained in the beginning
        // This is an easy way to query for any and all windows and do
        // further processing with them. Usually this is used to hide all
        // of such windows
        isWindow: true,
        layout: {
            type: 'fit'
        },
        cls: 'signup-and-login-container',
        floating: true,
        centered: true,
        fullscreen: true,
        modal: true,
        hidden: true,
        layer: 3,
        depthBasedOnOffset: true,
        querySelectorsForComponentsToBeHiddenToOptimizeLayer: [
        ],
        querySelectorsForComponentsToBeBlurredToOptimizeLayer: [
            '#pageUserRoot'
        ],
        items: [
            {
                xtype: 'signupandlogintabpanel',
                itemId: 'signupAndLoginTabPanel',
                cls: 'signup-and-login-container'
            }
        ]
    }
});