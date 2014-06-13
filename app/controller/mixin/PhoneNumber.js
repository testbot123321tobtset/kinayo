Ext.define('X.controller.mixin.PhoneNumber', {
    xhrCheckRegisteredPhoneNumbers: function(options) {
        var me = this;

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {

            var phoneNumbers = ('phoneNumbers' in options && Ext.isArray(options.phoneNumbers) && !Ext.isEmpty(options.phoneNumbers)) ? options.phoneNumbers : false;
            if (phoneNumbers) {

                var successCallback = false,
                        failureCallback = false;

                successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
                failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;

                if (successCallback || failureCallback) {
                    
                    //                    TODO: This should now send a request to the server
                    //                    checking for phone numbers that are in the user's
                    //                    device's contacts and also registered with us
                    //                    and then execute the callback appropriately
                    successCallback.arguments = {
                        phoneNumbers: phoneNumbers
                    };

                    me.executeCallback(successCallback);
                }
            }
        }

        return false;
    }
});