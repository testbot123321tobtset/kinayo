Ext.define('X.profile.Base', {
    extend: 'Ext.app.Profile',
    launch: function() {
        var me = this;
        if (X.config.Config.getDEBUG() === true) {
            console.log("Debug: X.profile.Base.launch()");
        }
    }
});
