Ext.define('overrides.Component', {
    override: 'Ext.Component',
    
    getLastXType: function() {
        var me = this;
        
        return me.getXTypes().split('/').last();
    },
    
    // http://docs.sencha.com/touch/2.3.0/#!/api/Ext.Component-method-setRecord
    setRecordRecursive: function(record) {
        var me = this;
        
        if (Ext.isObject(record)) {
            if ('setRecord' in me && Ext.isFunction(me.setRecord)) {
                me.setRecord(record);
            }
            if ('getItems' in me && Ext.isFunction(me.getItems)) {
                me.getItems().
                        each(function(item) {
                            if('setRecordRecursive' in item && Ext.isFunction(item.setRecordRecursive)) {
                                item.setRecordRecursive(record);
                            }
//                            me.setRecordRecursive.apply(item, [
//                                record
//                            ]);
                        });
            }
        }
        return me;
    },
    updateRecordDataRecursive: function(record) {
        var me = this;
        if (Ext.isObject(record)) {
            if ('updateData' in me && Ext.isFunction(me.updateData)) {
                me.updateData(record.getData(true));
            }
            if ('getItems' in me && Ext.isFunction(me.getItems)) {
                me.getItems().
                        each(function(item) {
                            if('updateRecordDataRecursive' in item && Ext.isFunction(item.updateRecordDataRecursive)) {
                                item.updateRecordDataRecursive(record);
                            }
//                            me.updateRecordDataRecursive.apply(item, [
//                                record
//                            ]);
                        });
            }
        }
        return me;
    },
    setDimensionsToFillScreen: function() {
        var me = this;
        var referenceComponent = Ext.Viewport;
        if (Ext.isObject(referenceComponent)) {
            var referenceComponentSize = referenceComponent.getSize();
            var referenceComponentWidth = referenceComponentSize.width;
            var referenceComponentHeight = referenceComponentSize.height;

            me.setWidth(referenceComponentWidth);
            me.setHeight(referenceComponentHeight);
        }
        return me;
    },
    setDimensions: function() {
        var me = this;
        me.setDimensionsToFillScreen();
        return me;
    },
    /*
     * Performance optimization: http://moduscreate.com/sencha-touch-2-0-expert-tip-how-to-increase-the-speed-of-your-app-rotation-by-temporarily-removing-dom/
     * var mainViewEl = this.mainView.renderElement.dom
     * this.mainViewParentNode = mainViewEl.parentNode; (Save the parentNode in memory)
     * mainViewEl.parentNode.removeChild(mainViewEl); (Remove the node from DOM)
     * this.mainViewParentNode.appendChild(mainViewEl); (Inject it back into DOM on demand)
     */
    getCustomShowAnimationConfig: function() {
        var me = this;;
        
        var lastXType = me.getLastXType();
        var animationConfig = false;
        
        switch (lastXType) {

            case 'loadingcontainer':
                animationConfig = X.config.Config.getSHOW_ANIMATION_CONFIG_FOR_NOTIFICATION();
                break;
            case 'notificationcontainer':
                animationConfig = X.config.Config.getSHOW_ANIMATION_CONFIG_FOR_NOTIFICATION();
                break;
            default:
                animationConfig = X.config.Config.getSHOW_ANIMATION_CONFIG();
                break;
        }
        
        return animationConfig;
    },
    getCustomHideAnimationConfig: function() {
        var me = this;;
        
        var lastXType = me.getLastXType();
        var animationConfig = false;
        
        switch (lastXType) {

            case 'loadingcontainer':
                animationConfig = X.config.Config.getHIDE_ANIMATION_CONFIG_FOR_NOTIFICATION();
                break;
            case 'notificationcontainer':
                animationConfig = X.config.Config.getHIDE_ANIMATION_CONFIG_FOR_NOTIFICATION();
                break;
            default:
                animationConfig = X.config.Config.getHIDE_ANIMATION_CONFIG();
                break;
        }
        
        return animationConfig;
    },
    open: function(animationConfig) {
        var me = this;

        animationConfig = (Ext.isObject(animationConfig) && !Ext.isEmpty(animationConfig)) ? animationConfig : me.getCustomShowAnimationConfig();
        animationConfig = (Ext.isObject(animationConfig) && !Ext.isEmpty(animationConfig)) ? animationConfig : false;
        if (animationConfig) {
            
            me.show(animationConfig);
            
            var lastXType = me.getLastXType();

            Ext.Viewport.fireEvent(lastXType + 'close', {
                component: me
            });
        }
        
        return me;
    },
    openFullScreen: function(animationConfig) {
        var me = this;
        
        animationConfig = (Ext.isObject(animationConfig) && !Ext.isEmpty(animationConfig)) ? animationConfig : me.getCustomShowAnimationConfig();
        animationConfig = (Ext.isObject(animationConfig) && !Ext.isEmpty(animationConfig)) ? animationConfig : false;
        if (animationConfig) {
            
            me.setDimensionsToFillScreen().
                    show(animationConfig);
            
            var lastXType = me.getLastXType();
            
            Ext.Viewport.fireEvent(lastXType + 'open', {
                component: me
            });
            
            Ext.Viewport.fireEvent(lastXType + 'openfullscreen', {
                component: me
            });
        }
        
        return me;
    },
    close: function(animationConfig) {
        var me = this;

        animationConfig = (Ext.isObject(animationConfig) && !Ext.isEmpty(animationConfig)) ? animationConfig : me.getCustomHideAnimationConfig();
        animationConfig = (Ext.isObject(animationConfig) && !Ext.isEmpty(animationConfig)) ? animationConfig : false;
        if (animationConfig) {
            
            me.hide(animationConfig);
            
            var lastXType = me.getLastXType();

            Ext.Viewport.fireEvent(lastXType + 'close', {
                component: me
            });
        }
        
        return me;
    },
    closeEverythingAboveMe: function() {
        var me = this;
        if ('getZIndex' in me) {
            var myZIndex = me.getZIndex();
            var viewportItems = Ext.Viewport.query('corecontainer, corepanel');
            var noOfViewportItems = viewportItems.length;
            var viewportItemsIndex = 0;
            for (; viewportItemsIndex < noOfViewportItems; viewportItemsIndex++) {
                var thisViewportItem = viewportItems[viewportItemsIndex];
                if ('getZIndex' in thisViewportItem) {
                    var thisViewportItemZIndex = thisViewportItem.getZIndex();
                    if (Ext.isNumeric(thisViewportItemZIndex) && thisViewportItemZIndex > myZIndex && thisViewportItem.getItemId() !== 'cameraTriggerPanel' && !thisViewportItem.isHidden()) {
                        thisViewportItem.close();
                    }
                }
            }
        }
        return me;
    }
});