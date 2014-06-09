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
   fetchPhoneNumbersOfDeviceContacts: function(options) {
       var me = this;
        
        var successCallback = false,
                failureCallback = false,
                callback = false;
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(options) {
            
            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
        }
        
        if (Ext.browser.is.PhoneGap) {
            if (me.getDebug()) {
                console.log('Debug: X.controller.mixin.DeviceContact.getPhoneNumbersFromDeviceContacts(): This is a Phonegap application: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }

            //                    Read from the device contact book
            navigator.contacts.find(
                    X.config.Config.getPG_READ_DEVICE_CONTACT_FIELDS(),
                    function(contacts) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.DeviceContact.fetchPhoneNumbersOfDeviceContacts(): navigator.contacts.find(): This is a Phonegap application: Success: Found the following contacts: ');
                            console.log(contacts);
                            console.log('Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }

                        var phoneNumbers = me.getPhoneNumbersFromGivenDeviceContacts(contacts);
                        phoneNumbers = (Ext.isArray(phoneNumbers) && !Ext.isEmpty(phoneNumbers)) ? phoneNumbers : false;
                        if (phoneNumbers) {
                            
                            if (successCallback) {

                                successCallback.arguments = {
                                    phoneNumbers: phoneNumbers
                                };

                                me.executeCallback(successCallback);
                                
                                callback && me.executeCallback(callback);
                            }
                        }
                        else {
                            
                            failureCallback && me.executeCallback(failureCallback);
                        
                            callback && me.executeCallback(callback);
                        }
                    },
                    function() {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.DeviceContact.fetchPhoneNumbersOfDeviceContacts(): navigator.contacts.find() Failed!: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }

                        failureCallback && me.executeCallback(failureCallback);
                        
                        callback && me.executeCallback(callback);
                    },
                    {
                        filter: '',
                        multiple: true
                    }
            );

            callback && me.executeCallback(callback);
        }
        else {
            if (me.getDebug()) {
                console.log('Debug: X.controller.mixin.DeviceContact.fetchPhoneNumbersOfDeviceContacts(): This is not a Phonegap application: Dummy data for device contacts: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }

            //                Make sure the file LocalDummyData.js exists in app/config directory
            Ext.require('X.config.LocalDummyData', function() {

                var contacts = X.config.LocalDummyData.getDEVICE_UNFORMATTED_CONTACTS();
                
                var phoneNumbers = me.getPhoneNumbersFromGivenDeviceContacts(contacts);
                phoneNumbers = (Ext.isArray(phoneNumbers) && !Ext.isEmpty(phoneNumbers)) ? phoneNumbers : false;
                if (phoneNumbers) {
                    
                    if (successCallback) {
                        
                        successCallback.arguments = {
                            phoneNumbers: phoneNumbers
                        };

                        me.executeCallback(successCallback);
                    }
                }
                else {
                    
                    failureCallback && me.executeCallback(failureCallback);
                }
            });

            callback && me.executeCallback(callback);
        }
        
       return me;
   },
   
   
   
    //   This will always refresh the store and check for registered users on server
    setDeviceContactsStore: function(options) {
        var me = this;
        
        var successCallback = false,
                failureCallback = false,
                callback = false;
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(options) {
            
            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
        }
        
        var deviceContactStore = Ext.getStore('DeviceContactStore');
        if (Ext.isObject(deviceContactStore)) {

            if (Ext.browser.is.PhoneGap) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.DeviceContact.setDeviceContactsStore(): This is a Phonegap application: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }

                //                    Read from the device contact book
                navigator.contacts.find(
                        X.config.Config.getPG_READ_DEVICE_CONTACT_FIELDS(),
                        function(contacts) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.DeviceContact.setDeviceContactsStore(): navigator.contacts.find(): This is a Phonegap application: Success: Found the following contacts: ');
                                console.log(contacts);
                                console.log('Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            
                            var phoneNumbers = me.getPhoneNumbersFromGivenDeviceContacts(contacts);
                            phoneNumbers = (Ext.isArray(phoneNumbers) && !Ext.isEmpty(phoneNumbers)) ? phoneNumbers : false;
                            if(phoneNumbers) {
                                
                                me.xhrCheckRegisteredPhoneNumbers({
                                    phoneNumbers: phoneNumbers,
                                    successCallback: {
                                        fn: function() {
                                            
                                            var args = arguments[0];
                                            if ('phoneNumbers' in args && Ext.isArray(args.phoneNumbers)) {

                                                var registeredPhoneNumbers = args.phoneNumbers;

                                                var formattedContacts = me.getFormattedContactsFromGivenDeviceContactsAfterFilteringForGivenPhoneNumbers(contacts, registeredPhoneNumbers);
                                                if (Ext.isArray(formattedContacts)) {

                                                    deviceContactStore.setContacts(formattedContacts);

                                                    successCallback.arguments = {
                                                        contacts: formattedContacts
                                                    };

                                                    me.executeCallback(successCallback);
                                                }
                                            }
                                        },
                                        scope: me
                                    },
                                    failureCallback: {
                                        fn: function() {
                                            console.log('failed!');
                                        },
                                        scope: me
                                    }
                                });
                            }
                        },
                        function() {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.DeviceContact.setDeviceContactsStore(): navigator.contacts.find() Failed!: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }

                            me.executeCallback(failureCallback);
                        },
                        {
                            filter: '',
                            multiple: true
                        }
                );
                
                me.executeCallback(callback);
                
                return me;
            }
            else {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.DeviceContact.setDeviceContactsStore(): This is not a Phonegap application: Dummy data for device contacts: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                
                //                Make sure the file LocalDummyData.js exists in app/config directory
                Ext.require('X.config.LocalDummyData', function() {
                    
                    var contacts = X.config.LocalDummyData.getDEVICE_UNFORMATTED_CONTACTS();
                    
                    var phoneNumbers = me.getPhoneNumbersFromGivenDeviceContacts(contacts);
                    
                    phoneNumbers = (Ext.isArray(phoneNumbers) && !Ext.isEmpty(phoneNumbers)) ? phoneNumbers : false;
                    
                    if (phoneNumbers) {

                        me.xhrCheckRegisteredPhoneNumbers({
                            phoneNumbers: phoneNumbers,
                            successCallback: {
                                fn: function() {
                                    
                                    var args = arguments[0];
                                    if ('phoneNumbers' in args && Ext.isArray(args.phoneNumbers)) {

                                        var registeredPhoneNumbers = args.phoneNumbers;

                                        var formattedContacts = me.getFormattedContactsFromGivenDeviceContactsAfterFilteringForGivenPhoneNumbers(contacts, registeredPhoneNumbers);
                                        if (Ext.isArray(formattedContacts)) {

                                            deviceContactStore.setContacts(formattedContacts);
                                            
                                            successCallback.arguments = {
                                                contacts: formattedContacts
                                            };

                                            me.executeCallback(successCallback);
                                        }
                                    }
                                },
                                scope: me
                            },
                            failureCallback: {
                                fn: function() {
                                    console.log('failed!');
                                },
                                scope: me
                            }
                        });
                    }
                });
                
                me.executeCallback(callback);
                
                return me;
            }
        }
        
        me.executeCallback(failureCallback);
        
        me.executeCallback(callback);
        
        return false;
    },
    //    This will simply load the deivice contacts store, meaning that it will
    //    simply load data from local storage. You could call
    //    load() directly on the store, but its generally a good idea to have a 
    //    wrapper, so we can perform additional stuff if need be
    loadDeviceContactsStore: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.DeviceContact.loadDeviceContactsStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var successCallback = false,
                failureCallback = false,
                callback = false;
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(options) {
            
            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
        }
        
        var deviceContactStore = Ext.getStore('DeviceContactStore');
        if (Ext.isObject(deviceContactStore)) {
            
            deviceContactStore.load(function(records, operation, success) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadDeviceContactsStore(): Success: ' + success + ': Records received:');
                    console.log(records);
                    console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }

                if (success) {
                    
                    if (successCallback) {

                        successCallback.arguments = {
                            contacts: formattedContacts
                        };

                        me.executeCallback(successCallback);
                    }
                }
                else {
                    failureCallback && me.executeCallback(failureCallback);
                }
                
                callback && me.executeCallback(callback);
            });
            
            return me;
        }
        
        failureCallback && me.executeCallback(failureCallback);

        callback && me.executeCallback(callback);
        
        return false;
    },
    getFormattedContactsFromGivenDeviceContacts: function(contacts) {
        var me = this;
        
        contacts = (Ext.isArray(contacts) && !Ext.isEmpty(contacts)) ? contacts : false;
        if (contacts) {
            
            var formattedContacts = [];
            
            var fieldsRequiredToImportDeviceContact = X.config.Config.getPG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT();
            var noOfContacts = contacts.length;
            
            for (var i = 0; i < noOfContacts; i++) {
                
                var thisContact = contacts[i];
                var doesNameExist = ('name' in thisContact && Ext.isObject(thisContact.name));
                if (doesNameExist) {
                    
                    // Get formatted contact if any of the fields listed in PG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT match the criteria
                    Ext.each(fieldsRequiredToImportDeviceContact, function(thisField) {
                        
                        var doesThisFieldExist = thisField in thisContact && Ext.isArray(thisContact[thisField]);
                        if (doesThisFieldExist) {
                            
                            var thisFormattedContact = me.getFormattedContactFromGivenDeviceContact(thisContact);
                            thisFormattedContact = (Ext.isObject(thisFormattedContact) && !Ext.isEmpty(thisFormattedContact)) ? thisFormattedContact : false;
                            if (thisFormattedContact) {
                                formattedContacts.push(thisFormattedContact);
                            }
                        }
                    });
                }
            }
            
            return formattedContacts;
        }
        
        return false;
    },
    getFormattedContactFromGivenDeviceContact: function(contact) {
        var me = this;

        contact = (Ext.isObject(contact) && !Ext.isEmpty(contact)) ? contact : false;
        if (contact) {
            
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
            
            return formattedContact;
        }
        
        return false;
    },
    getPhoneNumbersFromGivenDeviceContacts: function(contacts) {
        var me = this;
        
        contacts = (Ext.isArray(contacts) && !Ext.isEmpty(contacts)) ? contacts : false;
        if (contacts) {
            
            var phoneNumbers = [];
            
            var noOfContacts = contacts.length;
            
            for (var i = 0; i < noOfContacts; i++) {
                
                var thisContact = contacts[i];
                
                var doesNameExist = ('name' in thisContact && Ext.isObject(thisContact.name));
                if (doesNameExist) {
                    
                    var doesPhoneNumbersFieldExist = 'phoneNumbers' in thisContact && Ext.isArray(thisContact['phoneNumbers']);
                    if (doesPhoneNumbersFieldExist) {

                        var phoneNumbersForThisContact = me.getPhoneNumbersFromGivenDeviceContact(thisContact);
                        phoneNumbersForThisContact = (Ext.isArray(phoneNumbersForThisContact) && !Ext.isEmpty(phoneNumbersForThisContact)) ? phoneNumbersForThisContact : false;
                        if (phoneNumbersForThisContact) {
                            
                            phoneNumbers = Ext.Array.merge(phoneNumbers, phoneNumbersForThisContact);
                        }
                    }
                }
            }
            
            return phoneNumbers;
        }
        
        return false;
    },
    getPhoneNumbersFromGivenDeviceContact: function(contact) {
        var me = this;

        contact = (Ext.isObject(contact) && !Ext.isEmpty(contact)) ? contact : false;
        if (contact) {
            
            var phoneNumbers = [];
            
            Ext.Object.each(contact, function(key, value) {
                
                if (key === 'phoneNumbers' && Ext.isArray(value) && !Ext.isEmpty(value)) {
                    
                    Ext.each(value, function(thisPhoneNumber) {
                        
                        if (Ext.isObject(thisPhoneNumber)) {
                            
                            var phoneNumber = ('value' in thisPhoneNumber && Ext.isString(thisPhoneNumber.value) && !Ext.isEmpty(Ext.isString(thisPhoneNumber.value))) ? thisPhoneNumber.value : false;
                            if(phoneNumber) {
                                
                                phoneNumbers.push(parseInt(phoneNumber.replace(/[^0-9]/g, '')));
                            }
                        }
                    });
                }
            });
            
            return phoneNumbers;
        }
        
        return false;
    },
    getFormattedContactsFromGivenDeviceContactsAfterFilteringForGivenPhoneNumbers: function(contacts, phoneNumbers) {
        var me = this;
        
        contacts = (Ext.isArray(contacts) && !Ext.isEmpty(contacts)) ? contacts : false;
        if (contacts) {
            
            phoneNumbers = (Ext.isArray(phoneNumbers) && !Ext.isEmpty(phoneNumbers)) ? phoneNumbers : false;
            if (phoneNumbers) {
                
                var formattedContacts = [
                ];

                var fieldsRequiredToImportDeviceContact = X.config.Config.getPG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT();
                var noOfContacts = contacts.length;

                for (var i = 0; i < noOfContacts; i++) {

                    var thisContact = contacts[i];
                    var doesNameExist = ('name' in thisContact && Ext.isObject(thisContact.name));
                    if (doesNameExist) {

                        // Get formatted contact if any of the fields listed in PG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT match the criteria
                        Ext.each(fieldsRequiredToImportDeviceContact, function(thisField) {

                            var doesThisFieldExist = thisField in thisContact && Ext.isArray(thisContact[thisField]);
                            if (doesThisFieldExist) {

                                var isThisContactAllowed = false;

                                Ext.Object.each(thisContact, function(key, value) {
                                    if (key === 'phoneNumbers' && Ext.isArray(value) && !Ext.isEmpty(value)) {

                                        Ext.each(value, function(thisPhoneNumberObject) {

                                            if (Ext.isObject(thisPhoneNumberObject) && !Ext.isEmpty(thisPhoneNumberObject)) {

                                                var thisPhoneNumber = ('value' in thisPhoneNumberObject) ? thisPhoneNumberObject.value : false;
                                                if (thisPhoneNumber) {

                                                    thisPhoneNumber = (Ext.isString(thisPhoneNumber) && !Ext.isEmpty(thisPhoneNumber)) ? thisPhoneNumber : false;

                                                    if (Ext.Array.contains(phoneNumbers, thisPhoneNumber)) {

                                                        isThisContactAllowed = true;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });

                                if (isThisContactAllowed) {
                                    var thisFormattedContact = me.getFormattedContactFromGivenDeviceContact(thisContact);
                                    thisFormattedContact = (Ext.isObject(thisFormattedContact) && !Ext.isEmpty(thisFormattedContact)) ? thisFormattedContact : false;
                                    if (thisFormattedContact) {
                                        formattedContacts.push(thisFormattedContact);
                                    }
                                }
                            }
                        });
                    }
                }

                return formattedContacts;
            }
        }
        
        return false;
    },
    resetDeviceContactsStore: function(options) {
        var me = this;
        
        var deviceContactStore = Ext.getStore('DeviceContactStore');
        if (Ext.isObject(deviceContactStore)) {

            deviceContactStore.resetContacts();
        }
        
        return false;
    }
});