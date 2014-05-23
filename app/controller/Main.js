/* 
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('X.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'X.view.plugandplay.CameraTriggerPanel'
    ],
    mixins: {
        util: 'X.controller.mixin.Util',
        parse: 'X.controller.mixin.Parse',
        common: 'X.controller.mixin.Common',
        factory: 'X.controller.mixin.Factory',
        page: 'X.controller.mixin.Page',
        user: 'X.controller.mixin.User',
        group: 'X.controller.mixin.Group',
        deviceContact: 'X.controller.mixin.DeviceContact'
    },
    config: {
        debug: false,
        bootupDebug: false,
        detailedDebug: false,
        refs: {
        },
        control: {
        },
        routes: {
        }
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Main.init()");
        }
        
        // Viewport listeners: this seems like a better way to reliably listen
        // to events on viewport compared to having these in 'control' object
        Ext.Viewport.onBefore({
            painted: {
                fn: 'onViewportBeforePainted',
                scope: me,
                single: true
            }
        });
        Ext.Viewport.on({
            painted: {
                fn: 'onViewportPainted',
                scope: me,
                single: true
            }
//            We are not using this just yet
//            orientationchange: {
//                fn: 'onOrientationchange',
//                scope: me
//            }
        });
    },
    onViewportBeforePainted: function(viewportElement, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log("Debug: X.controller.Main.onViewportBeforePainted()");
        }
        
//        http://druckit.wordpress.com/2013/09/24/about-sencha-touch-2-x-phonegapcordova-and-ios-7/
//        if (Ext.os.is.MacOS || (Ext.os.is.iOS && Ext.os.version.major === 7)) {
//            document.body.style.setProperty('margin-top', '20px', 'important');
//            console.log(Ext.Viewport.getWindowHeight());
//            window.innerHeight = (Ext.Viewport.getWindowHeight() - 20);
//            console.log(Ext.Viewport.getWindowHeight());
//        }
        
        Ext.Viewport.fireEvent('viewportbeforepainted', {
            element: viewportElement
        });
        return me;
    },
    onViewportPainted: function(viewportElement, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log("Debug: X.controller.Main.onViewportPainted()");
        }
        
        Ext.Viewport.fireEvent('viewportpainted', {
            element: viewportElement
        });
        me.generateComponentsOnViewportPainted();
        return me;
    },
    onOrientationchange: function() {
        var me = this;
        if (me.getDebug()) {
            console.log("Debug: X.controller.Main.onOrientationchange()");
        }
    }
});
