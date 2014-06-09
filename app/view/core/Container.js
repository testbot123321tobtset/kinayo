Ext.define('X.view.core.Container', {
    extend: 'Ext.Container',
    xtype: 'corecontainer',
    autoDestroy: false,
    config: {
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            },
            {
                fn: 'onPainted',
                event: 'painted'
            },
            {
                fn: 'onBeforeShow',
                event: 'beforeshow'
            },
            {
                fn: 'onShow',
                event: 'show'
            },
            {
                fn: 'onBeforeHide',
                event: 'beforehide'
            },
            {
                fn: 'onHide',
                event: 'hide'
            },
//            {
//                fn: 'onSwipeDown',
//                event: 'swipedown'
//            },
            {
                fn: 'onUpdateData',
                event: 'updatedata'
            }
        ]
    },
    onInitialize: function() {
        var me = this;
        me.onBefore('hide', function() {
            me.fireEvent('beforehide', me);
        });
        me.onBefore('show', function() {
            me.fireEvent('beforeshow', me);
        });
        return me;
    },
    onPainted: function() {
        var me = this;
        return me;
    },
    onBeforeShow: function() {
        var me = this;
        return me;
    },
    onShow: function() {
        var me = this;
        return me;
    },
    onBeforeHide: function() {
        var me = this;
        return me;
    },
    onHide: function() {
        var me = this;
        return me;
    },
    onSwipeDown: function(me, e) {
        me.close();
        return me;
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.close();
        return me;
    },
    onContinueButtonTap: function(button, e, eOpts) {
        var me = this;
        me.close();
        return me;
    },
    onDeleteButtonTap: function(button, e, eOpts) {
        return this;
    },
    onUpdateData: function() {
        return this;
    },
    open: function() {
        var me = this;
        
        me.show(X.config.Config.getSHOW_ANIMATION_CONFIG());
        
        return me;
    },
    close: function() {
        var me = this;
        
        me.hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        
        return me;
    }
});
