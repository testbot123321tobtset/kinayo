Ext.define('overrides.form.Panel', {
    override: 'Ext.form.Panel',
    config: {
    },
    removeRecord: function() {
        var me = this;
        
        var currentRecord = me.getRecord();
        currentRecord = (Ext.isObject(currentRecord) && !Ext.isEmpty(currentRecord)) ? currentRecord : false;
        if (currentRecord) {
            
            delete me._record;
            me.suspendEvents();
            me.reset();
            me.resumeEvents(true);
            
            me.fireEvent('removedrecord', me, currentRecord);
        }
        
        return me;
    }
});