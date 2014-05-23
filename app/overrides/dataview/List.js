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
});


//For infinite list and list paging:
//http://stackoverflow.com/questions/14750337/implement-sencha-touch-listpaging-plugin
//http://www.enovision.net/listpaging-plugin-sencha-touch/
//http://www.sencha.com/blog/whats-new-in-sencha-touch-21/