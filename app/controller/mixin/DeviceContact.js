Ext.define('X.controller.mixin.DeviceContact', {
    /*
        iPhone device contact looks like:
        {
            addresses: null
            birthday: null
            categories: null
            displayName: null
            emails: [
                {
                    id: 0
                    pref: false
                    type: "home"
                    value: "johndoe@apple.com"
                }
            ]
            id: 1682
            ims: null
            name: {
                familyName: "Doe"
                formatted: "John Doe"
                givenName: "John"
                honorificPrefix: null
                honorificSuffix: null
                middleName: null
            }
            nickname: null
            note: null
            organizations: null
            phoneNumbers: [
                {
                    pref: false,
                    type: "mobile",
                    value: "(777) 777-7777"
                }
            ],
            photos: null
            rawId: null
            urls: null
        }
    
        Formatted contact looks like:
        {
            familyName: "Doe",
            formattedName: "John Doe",
            givenName: "John",
            phoneNumbers: [
                {
                    type: 'mobile',
                    value: '(777) 777-7777'
                } 
            ],
            emails: [
                {
                    type: 'home',
                    value: 'johndoe@apple.com'
                }
            ]
        }
     */
    setDeviceContactsStoreAndCallback: function(options) {
        var me = this;
        if (Ext.isObject(options) && 'successCallback' in options && Ext.isObject(options.successCallback)) {
            var deviceContactStore = Ext.getStore('DeviceContactStore');
            if (Ext.isObject(deviceContactStore)) {
                if (Ext.browser.is.PhoneGap) {
                    navigator.contacts.find(
                            X.config.Config.getPG_READ_DEVICE_CONTACT_FIELDS(),
                            function(contacts) {
                                var formattedContacts = me.getFormattedContactFromGivenDeviceContacts(contacts);
                                var deviceContactsStore = Ext.getStore('DeviceContactStore');
                                deviceContactsStore.setData(formattedContacts);
                                options.successCallback.arguments = {
                                    contacts: formattedContacts
                                };
                                me.executeCallback(options.successCallback);
                            },
                            function() {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.DeviceContact.setDeviceContactsStoreAndCallback(): navigator.contacts.find() Failed!: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            },
                            {
                                filter: '',
                                multiple: true
                            }
                    );
                    return me;
                }
                else {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.DeviceContact.setDeviceContactsStoreAndCallback(): Dummy data for device contacts: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    if(deviceContactStore.isLoaded()) {
                        var formattedContacts = deviceContactStore.getData();
                        options.successCallback.arguments = {
                            contacts: formattedContacts
                        };
                        me.executeCallback(options.successCallback);
                    }
                    else {
                        var formattedContacts = X.config.DummyData.getDEVICE_FORMATTED_CONTACTS();
                        deviceContactStore.setContacts(formattedContacts);
                        options.successCallback.arguments = {
                            contacts: formattedContacts
                        };
                        me.executeCallback(options.successCallback);
                    }
                }
            }
        }
        return false;
    },
    getFormattedContactFromGivenDeviceContacts: function(contacts) {
        var me = this;
        var formattedContacts = [
        ];
        if (Ext.isArray(contacts) && !Ext.isEmpty(contacts)) {
            var fieldsRequiredToImportDeviceContact = X.config.Config.getPG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT();
            var noOfContacts = contacts.length;
            for (var i = 0; i < noOfContacts; i++) {
                var thisContact = contacts[i];
                if (('name' in thisContact && Ext.isObject(thisContact.name) && !Ext.isEmpty(thisContact.name))) {
                    // Get formatted contact if any of the fields listed in PG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT match the criteria
                    Ext.each(fieldsRequiredToImportDeviceContact, function(thisField) {
                        if (thisField in thisContact && Ext.isArray(thisContact[thisField]) && !Ext.isEmpty(thisContact[thisField])) {
                            var thisFormattedContact = me.getFormattedContactFromGivenDeviceContact(thisContact);
                            if (Ext.isObject(thisFormattedContact) && !Ext.isEmpty(thisFormattedContact)) {
                                formattedContacts.push(thisFormattedContact);
                            }
                            return false;
                        }
                    });
                }
            }
        }
        if (!Ext.isEmpty(formattedContacts)) {
            return formattedContacts;
        }
        return false;
    },
    getFormattedContactFromGivenDeviceContact: function(contact) {
        var me = this;
        var formattedContact = {};
        Ext.Object.each(contact, function(key, value) {
            if (key === 'name' && Ext.isObject(value) && !Ext.isEmpty(value)) {
                // Use something like this to get dummy data
                // formattedContact.familyName = Ext.isString(value.familyName) ? (Ext.browser.is.PhoneGap ? value.familyName : ('Family' + me.getRandomInt(0, 1000))) : false;
                // formattedContact.formattedName = Ext.isString(value.formatted) ? (Ext.browser.is.PhoneGap ? value.formatted : ('Given Family Formatted' + me.getRandomInt(0, 1000))) : false;
                // formattedContact.givenName = Ext.isString(value.givenName) ? (Ext.browser.is.PhoneGap ? value.givenName : ('Given' + me.getRandomInt(0, 1000))) : false;
                formattedContact.familyName = Ext.isString(value.familyName) ? value.familyName : false;
                formattedContact.formattedName = Ext.isString(value.formatted) ? value.formatted : false;
                formattedContact.givenName = Ext.isString(value.givenName) ? value.givenName : false;
            }
            if (key === 'emails' && Ext.isArray(value) && !Ext.isEmpty(value)) {
                formattedContact.emails = [
                ];
                Ext.each(value, function(thisEmail) {
                    if (Ext.isObject(thisEmail)) {
                        var formattedEmail = {};
                        formattedEmail.type = Ext.isString(thisEmail.type) ? thisEmail.type : false;
                        // Use something like this to get dummy data
                        // formattedEmail.value = Ext.isString(thisEmail.value) ? (Ext.browser.is.PhoneGap ? thisEmail.value : ('email' + me.getRandomInt(0, 1000) + '@streads.com')) : false;
                        formattedEmail.value = Ext.isString(thisEmail.value) ? thisEmail.value : false;
                        formattedContact.emails.push(formattedEmail);
                    }
                });
            }
            if (key === 'phoneNumbers' && Ext.isArray(value) && !Ext.isEmpty(value)) {
                formattedContact.phoneNumbers = [
                ];
                Ext.each(value, function(thisPhoneNumber) {
                    if (Ext.isObject(thisPhoneNumber)) {
                        var formattedPhoneNumber = {};
                        formattedPhoneNumber.type = Ext.isString(thisPhoneNumber.type) ? thisPhoneNumber.type : false;
                        // Use something like this to get dummy data
                        // formattedPhoneNumber.value = Ext.isString(thisPhoneNumber.value) ? (Ext.browser.is.PhoneGap ? thisPhoneNumber.value : '(' + me.getRandomInt(100, 999) + ') ' + me.getRandomInt(100, 999) + '-' + me.getRandomInt(100, 999)) : false;
                        formattedPhoneNumber.value = Ext.isString(thisPhoneNumber.value) ? thisPhoneNumber.value : false;
                        formattedContact.phoneNumbers.push(formattedPhoneNumber);
                    }
                });
            }
        });
        if (!Ext.isEmpty(formattedContact)) {
            return formattedContact;
        }
        return false;
    }
});