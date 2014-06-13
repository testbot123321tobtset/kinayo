Ext.define('overrides.TabPanel', {
    override: 'Ext.TabPanel',
    config: {
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            }
        ]
    },
    onInitialize: function(me) {

        //        Configure animation
        me.getLayout().
                setAnimation(X.config.Config.getANIMATION_CONFIG_FOR_TABPANEL());
    }
});