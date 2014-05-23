Ext.define('overrides.TitleBar', {
    override: 'Ext.TitleBar',
    config: {
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            }
        ]
    }
//    ,
//    onInitialize: function(me) {
//        me.element.on('swipe', function(event) {
//            if (event.direction === 'down') {
//                var coreContainer = me.up('corecontainer');
//                coreContainer.fireEvent('swipedown', coreContainer, event);
//            }
//        });
//    }
});