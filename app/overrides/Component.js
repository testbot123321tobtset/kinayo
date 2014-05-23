Ext.define('overrides.Component', {
    override: 'Ext.Component',
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
                            me.setRecordRecursive.apply(item, [
                                record
                            ]);
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
                            me.updateRecordDataRecursive.apply(item, [
                                record
                            ]);
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
    //    This is not being used right now. If used, this will have every window-like element 
    //    render with an offset from the sides and the window itself with a drop shadow to
    //    give the user a sense of spatial context
    setDimensionsBasedOnDepthOffsetRelativeToGivenComponentAdjustingForLayer: function(referenceComponent) {
        var me = this;
        referenceComponent = Ext.isObject(referenceComponent) ? referenceComponent : Ext.Viewport;
        if (Ext.isObject(referenceComponent) && Ext.isNumber(me.getLayer())) {
            var myLayer = me.getLayer();
            var referenceComponentSize = referenceComponent.getSize();
            var referenceComponentWidth = referenceComponentSize.width;
            var referenceComponentHeight = referenceComponentSize.height;
            var layerHorizontalOffset = X.config.Config.getLAYER_HORIZONTAL_OFFSET();
            var layerVerticalOffset = X.config.Config.getLAYER_VERTICAL_OFFSET();

            me.setWidth(referenceComponentWidth - (2 * myLayer * layerHorizontalOffset));
            me.setLeft(myLayer * layerHorizontalOffset);
            me.setRight(myLayer * layerHorizontalOffset);

            me.setHeight(referenceComponentHeight - (myLayer * layerVerticalOffset));
            me.setTop(myLayer * layerVerticalOffset);
        }
        return me;
    },
    setDimensions: function(referenceComponent) {
        var me = this;
        referenceComponent = Ext.isObject(referenceComponent) ? referenceComponent : Ext.Viewport;
        if (X.config.Config.getLAYER_DEPTH_BASED_ON_OFFSET() && me.getDepthBasedOnOffset()) {
            me.setDimensionsBasedOnDepthOffsetRelativeToGivenComponentAdjustingForLayer(referenceComponent);
        }
        else {
            me.setDimensionsToFillScreen();
        }
        return me;
    },
    //    This is not being used right now
    setBlurredBackgroundForDepth: function() {
        var me = this;
        Ext.each(Ext.Viewport.query('corecontainer'), function(thisCoreContainer) {
            if (thisCoreContainer.getId() !== me.getId() && !thisCoreContainer.isHidden() && thisCoreContainer.getZIndex() < me.getZIndex()) {
                thisCoreContainer.addCls('blurred-background');
            }
        });
        Ext.each(Ext.Viewport.query('tabpanel'), function(thisTabPanel) {
            if (!thisTabPanel.isHidden() && thisTabPanel.getZIndex() < me.getZIndex()) {
                thisTabPanel.addCls('blurred-background');
            }
        });
        return me;
    },
    resetBlurredBackgroundForDepth: function() {
        var me = this;
        Ext.each(Ext.Viewport.query('corecontainer'), function(thisCoreContainer) {
            thisCoreContainer.removeCls('blurred-background');
        });
        Ext.each(Ext.Viewport.query('tabpanel'), function(thisTabPanel) {
            thisTabPanel.removeCls('blurred-background');
        });
        return me;
    },
    /*
     * Performance optimization: http://moduscreate.com/sencha-touch-2-0-expert-tip-how-to-increase-the-speed-of-your-app-rotation-by-temporarily-removing-dom/
     * var mainViewEl = this.mainView.renderElement.dom
     * this.mainViewParentNode = mainViewEl.parentNode; (Save the parentNode in memory)
     * mainViewEl.parentNode.removeChild(mainViewEl); (Remove the node from DOM)
     * this.mainViewParentNode.appendChild(mainViewEl); (Inject it back into DOM on demand)
     */
    createOptimizedLayeredEffect: function() {
        var me = this;
        var visibleComponent = me;
        var querySelectorsForComponentsToBeHidden = Ext.isFunction(visibleComponent.getQuerySelectorsForComponentsToBeHiddenToOptimizeLayer) ? visibleComponent.getQuerySelectorsForComponentsToBeHiddenToOptimizeLayer() : false;
        var querySelectorsForComponentsToBeBlurred = Ext.isFunction(visibleComponent.getQuerySelectorsForComponentsToBeBlurredToOptimizeLayer) ? visibleComponent.getQuerySelectorsForComponentsToBeBlurredToOptimizeLayer() : false;
        var viewport = Ext.Viewport;
        if (Ext.isArray(querySelectorsForComponentsToBeHidden) && !Ext.isEmpty(querySelectorsForComponentsToBeHidden)) {
            Ext.each(querySelectorsForComponentsToBeHidden, function(thisComponentQuerySelector) {
                Ext.each(viewport.query(thisComponentQuerySelector), function(thisComponent) {
                    thisComponent.hide();
                });
            });
        }
        if (Ext.isArray(querySelectorsForComponentsToBeBlurred) && !Ext.isEmpty(querySelectorsForComponentsToBeBlurred)) {
            Ext.each(querySelectorsForComponentsToBeBlurred, function(thisComponentQuerySelector) {
                Ext.each(viewport.query(thisComponentQuerySelector), function(thisComponent) {
                    thisComponent.addCls('blurred-background');
                });
            });
        }
        return me;
    },
    revertOptimizedLayeredEffect: function() {
        var me = this;
        var visibleComponent = me;
        var querySelectorsForComponentsToBeShown = Ext.isFunction(visibleComponent.getQuerySelectorsForComponentsToBeHiddenToOptimizeLayer) ? visibleComponent.getQuerySelectorsForComponentsToBeHiddenToOptimizeLayer() : false;
        var querySelectorsForComponentsToBeUnblurred = Ext.isFunction(visibleComponent.getQuerySelectorsForComponentsToBeBlurredToOptimizeLayer) ? visibleComponent.getQuerySelectorsForComponentsToBeBlurredToOptimizeLayer() : false;
        var viewport = Ext.Viewport;
        if (Ext.isArray(querySelectorsForComponentsToBeShown) && !Ext.isEmpty(querySelectorsForComponentsToBeShown)) {
            Ext.each(querySelectorsForComponentsToBeShown, function(thisComponentQuerySelector) {
                Ext.each(viewport.query(thisComponentQuerySelector), function(thisComponent) {
                    thisComponent.show();
                });
            });
        }
        if (Ext.isArray(querySelectorsForComponentsToBeUnblurred) && !Ext.isEmpty(querySelectorsForComponentsToBeUnblurred)) {
            var layerOfComponentToBeUnblurred = false;
            var componentToBeUnblurred = false;
            Ext.each(querySelectorsForComponentsToBeUnblurred, function(thisComponentQuerySelector) {
                Ext.each(viewport.query(thisComponentQuerySelector), function(thisComponent) {
                    if (!thisComponent.isHidden()) {
//                        Unblur only the topmost layer that is not hidden
                        var layerOfThisComponent = ('getLayer' in thisComponent && Ext.isFunction(thisComponent.getLayer)) ? thisComponent.getLayer() : 0;
                        if (Ext.isNumeric(layerOfComponentToBeUnblurred)) {
                            if (layerOfComponentToBeUnblurred < layerOfThisComponent) {
                                layerOfComponentToBeUnblurred = layerOfThisComponent;
                                componentToBeUnblurred = thisComponent;
                            }
                        }
                        else {
                            layerOfComponentToBeUnblurred = layerOfThisComponent;
                            componentToBeUnblurred = thisComponent;
                        }
                    }
                    else {
//                        Unblur all hidden layer10
                        thisComponent.removeCls('blurred-background');
                    }
                });
            });
            if (Ext.isObject(componentToBeUnblurred)) {
                componentToBeUnblurred.removeCls('blurred-background');
            }
        }
        return me;
    },
    open: function() {
        return this.setDimensionsToFillScreen().
                createOptimizedLayeredEffect().
                show(X.config.Config.getSHOW_BY_POP_ANIMATION_CONFIG());
    },
    close: function() {
        return this.revertOptimizedLayeredEffect().
                hide(X.config.Config.getHIDE_BY_POP_ANIMATION_CONFIG());
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