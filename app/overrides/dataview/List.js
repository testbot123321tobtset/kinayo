Ext.define('overrides.dataview.List', {
    override: 'Ext.dataview.List',
    config: {
        minimumBufferDistance: 5,
        bufferSize: 10,
        listeners: [
            {
                fn: 'onDisclose',
                event: 'disclose'
            }
        ]
    },
    onDisclose: function(me, record, target, index, e, eOpts) {
        var isSelected = me.isSelected(record);
        if(isSelected) {
            me.deselect(record);
        }
        else {
            var selectedRecords = me.getSelection();
            selectedRecords.push(record);
            me.select(selectedRecords);
        }
    }
//    ,
//    http://www.sencha.com/forum/showthread.php?276455-Ext.dataview.List-config.grouped-false-no-longer-works-in-2.3.1-for-Infinite-List.
//    updateGrouped: function(grouped) {
//        var me = this,
//            baseCls = this.getBaseCls(),
//            pinnedHeader = me.pinnedHeader,
//            cls = baseCls + '-grouped',
//            unCls = baseCls + '-ungrouped';
//
//        if (pinnedHeader) {
//            pinnedHeader.translate(0, -10000);
//        }
//
//        if (grouped) {
//            me.addCls(cls);
//            me.removeCls(unCls);
//        }
//        else {
//            me.addCls(unCls);
//            me.removeCls(cls);
//        }
//
//        // here's the fix: appended -> && !grouped <- to the if clause
//        if (me.getInfinite() && !grouped) {
//            me.refreshHeaderIndices();
//            me.handleItemHeights();
//        }
//        me.updateAllListItems();
//    }
});


//For infinite list and list paging:
//http://stackoverflow.com/questions/14750337/implement-sencha-touch-listpaging-plugin
//http://www.enovision.net/listpaging-plugin-sencha-touch/
//http://www.sencha.com/blog/whats-new-in-sencha-touch-21/