Ext.define('X.controller.Boot', {
    extend: 'X.controller.Main',
    config: {
        refs: {
        },
        control: {
        },
        routes: {
            '': 'onNoBookmarkFound'
        }
    },
    onNoBookmarkFound: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Boot.onNoBookmarkFound(): Will redirect to X.XConfig.getDEFAULT_LOGIN_PAGE(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo(X.XConfig.getDEFAULT_LOGIN_PAGE());
        return me;
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log('Debug: X.controller.Boot.init()');
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log('Debug: X.controller.Boot.launch()');
        }
    }
});
