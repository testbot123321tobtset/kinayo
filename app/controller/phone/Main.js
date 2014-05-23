/*
 * This is the Main controller subclass for the 'phone' profile. Most of the functionality required for this controller
 * is provided by the X.controller.Main superclass, but we do need to add a couple of refs and control
 * statements to provide a slightly different behavior for the phone.
 */
Ext.define('X.controller.phone.Main', {
    extend: 'X.controller.Main',
    config: {
        refs: {
        },
        control: {
        }
    },
    launch: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.phone.Main.launch()");
        }
    }
});