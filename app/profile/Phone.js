Ext.define('X.profile.Phone', {
    extend: 'X.profile.Base',
    config: {
        controllers: [
        ],
        views: [
        ]
    },
    isActive: function() {
        return Ext.os.is.Phone;
    },
    launch: function() {
        var me = this;
        if (X.config.Config.getDEBUG() === true) {
            console.log("Debug: X.profile.Phone.launch()");
        }
    }
});