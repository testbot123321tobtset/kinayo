Ext.define('X.store.DeviceContacts', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.DeviceContact',
        storeId: 'DeviceContactStore',
        autoLoad: false,
        autoSync: false,
        sorters: 'formattedName',
        grouper: {
            groupFn: function(record) {
                return Ext.isString(record.get('formattedName')) ? record.get('formattedName')[0] : false;
            }
        }
    },
    getEmails: function() {
        var me = this;
        var emails = [];
        me.each(function(thisContact) {
            var thisContactEmails = thisContact.getAllEmails();
            if(Ext.isArray(thisContactEmails)) {
                emails = Ext.Array.merge(emails, thisContactEmails);
            }
        });
        return emails;
    }
});