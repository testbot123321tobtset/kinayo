Ext.define('overrides.TabPanel', {
    override: 'Ext.TabPanel',
    config: {
        layout: {
            type: 'card',
            animation: {
                // Available animations (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.layout.Card-cfg-animation)
                // cover
                // cube
                // fade
                // flip
                // pop
                // reveal
                // scroll
                // slide
                type: 'flip',
                duration: 200,
                easing: 'cubic-bezier(0,.23,0,1)'
            }
        }
    }
});