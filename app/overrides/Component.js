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
    open: function() {
        return this.setDimensionsToFillScreen().
                show(X.config.Config.getSHOW_BY_POP_ANIMATION_CONFIG());
    },
    close: function() {
        return this.hide(X.config.Config.getHIDE_BY_POP_ANIMATION_CONFIG());
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