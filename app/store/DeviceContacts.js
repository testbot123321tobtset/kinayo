Ext.define('X.store.DeviceContacts', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.DeviceContact',
        storeId: 'DeviceContactStore',
        
        autoLoad: false,
        autoSync: true,
        
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
    },
    getPhoneNumbers: function() {
        var me = this;
        
        var phoneNumbers = [];
        me.each(function(thisContact) {
            var thisContactPhoneNumbers = thisContact.getAllPhoneNumbers();
            if(Ext.isArray(thisContactPhoneNumbers)) {
                phoneNumbers = Ext.Array.merge(phoneNumbers, thisContactPhoneNumbers);
            }
        });
        
        return phoneNumbers;
    },
    setContacts: function(contacts) {
        var me = this;
        
        if(Ext.isArray(contacts)) {
            
            me.setData(contacts);
            
            if(!me.loaded) {
                me.loaded = true;
            }
        }
        
        return me;
    },
    resetContacts: function() {
        var me = this;
        
        me.removeAll();
        
        return me;
    },
    reset: function() {
        var me = this;
        
        me.resetContacts();
        
        return me;
    }
});