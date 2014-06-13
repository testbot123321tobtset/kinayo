Ext.define('overrides.Toolbar', {
    override: 'Ext.TitleBar',
    config: {
        minHeight: '3.2em',
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            }
        ]
    },
    onInitialize: function(me) {
        me.element.on('swipe', function(event) {
            if (event.direction === 'down') {
                var coreContainer = me.up('corecontainer');
                coreContainer.fireEvent('swipedown', coreContainer, event);
            }
        });
    }
});