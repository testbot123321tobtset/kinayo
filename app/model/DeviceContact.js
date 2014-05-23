Ext.define('X.model.DeviceContact', {
    extend: 'X.model.Application',
    requires: [
        'Ext.data.reader.Json'
    ],
    config: {
        fields: [
            {
                name: 'familyName',
                type: 'string'
            },
            {
                name: 'formattedName',
                type: 'string'
            },
            {
                name: 'givenName',
                type: 'string'
            },
            {
                name: 'phoneNumbers',
                type: 'auto'
            },
            {
                name: 'emails',
                type: 'auto'
            }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'result'
            }
        }
    },
    getAllEmails: function() {
        var me = this;
        var emails = [];
        var thisContactEmails = me.get('emails');
        if (Ext.isArray(thisContactEmails) && !Ext.isEmpty(thisContactEmails)) {
            Ext.each(thisContactEmails, function(thisContactEmailObject) {
                if(Ext.isObject(thisContactEmailObject) && !Ext.isEmpty(thisContactEmailObject) && 'value' in thisContactEmailObject) {
                    var thisContactEmail = thisContactEmailObject.value;
                    if (Ext.isString(thisContactEmail) && Ext.data.Validations.email(false, thisContactEmail)) {
                        emails.push(thisContactEmail);
                    }
                }
            });
        }
        return emails;
    }
});
