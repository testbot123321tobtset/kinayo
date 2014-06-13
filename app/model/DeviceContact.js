Ext.define('X.model.DeviceContact', {
    extend: 'X.model.Application',
    requires: [
        'Ext.data.reader.Json'
    ],
    config: {
        identifier: 'uuid',
        fields: [
            {
                name: 'id'
            },
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
            type: 'localstorage',
            id: 'device-contacts'
        }
    },
    getAllEmails: function() {
        var me = this;
        var emails = [
        ];
        var thisContactEmails = me.get('emails');
        if (Ext.isArray(thisContactEmails) && !Ext.isEmpty(thisContactEmails)) {
            Ext.each(thisContactEmails, function(thisContactEmailObject) {
                if (Ext.isObject(thisContactEmailObject) && !Ext.isEmpty(thisContactEmailObject) && 'value' in thisContactEmailObject) {
                    var thisContactEmail = thisContactEmailObject.value;
                    if (Ext.isString(thisContactEmail) && Ext.data.Validations.email(false, thisContactEmail)) {
                        emails.push(thisContactEmail);
                    }
                }
            });
        }
        return emails;
    },
    getAllPhoneNumbers: function() {
        var me = this;

        var phoneNumbers = [
        ];
        var thisContactPhoneNumbers = me.get('phoneNumbers');
        if (Ext.isArray(thisContactPhoneNumbers) && !Ext.isEmpty(thisContactPhoneNumbers)) {
            Ext.each(thisContactPhoneNumbers, function(thisContactPhoneNumberObject) {
                if (Ext.isObject(thisContactPhoneNumberObject) && !Ext.isEmpty(thisContactPhoneNumberObject) && 'value' in thisContactPhoneNumberObject) {
                    //                    Remove every character except numbers and then convert to integer
                    phoneNumbers.push(parseInt(thisContactPhoneNumberObject.value.replace(/[^0-9]/g, '')));
                }
            });
        }

        return phoneNumbers;
    }
});
