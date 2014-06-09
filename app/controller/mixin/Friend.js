Ext.define('X.controller.mixin.Friend', {
    //        The logic:
    //        1. freshly read device contacts from the device and get all the phone numbers
    //        2. PUT to authenticated user using its store with:
    //              1. an empty friends array  (the friends array must be a field on the _User class
    //                  in Parse that contains pointers to itself i.e. _User objects)
    //              2. URL encoded param that is the list of all the phone numbers from the user's device
    //        3. on Parse, we need to capture request beforeSave, check the phone numbers it receives to see
    //              which of those are registered with Parse. Once we find the ones that are registered with Parse,
    //              we set the friends array to contain pointers to those _User objects that matched and then
    //              send back the authenticated user object
    //        4. we then read this authenticated user object, grab all the _User object in the friends array, and set
    //              the friends store with this data
    fetchFriendsFromServerForPhoneNumbersOfDeviceContactsAndSetFriendsStore: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Friend: fetchFriendsFromServerForPhoneNumbersOfDeviceContactsAndSetFriendsStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
        
        return me.fetchPhoneNumbersOfDeviceContacts({
            
            successCallback: {
                
                fn: function() {
                    
                    var args = arguments[0];
                    
                    var phoneNumbers = ('phoneNumbers' in args && Ext.isArray(args.phoneNumbers) && !Ext.isEmpty(args.phoneNumbers)) ? args.phoneNumbers : false;
                    if (phoneNumbers) {

                        me.xhrUpdateFriendsOnServerForGivenPhoneNumbers({
                            
                            phoneNumbers: phoneNumbers,
                            successCallback: {
                                fn: function() {

                                    var theseArgs = arguments[0];
                                    var updatedAuthenticatedUser = 'userWithUpdatedFriends' in theseArgs ? theseArgs.userWithUpdatedFriends : false;
                                    if(updatedAuthenticatedUser) {
                                        
                                        var updatedAuthenticatedUser = (Ext.isObject(updatedAuthenticatedUser) && !Ext.isEmpty(updatedAuthenticatedUser)) ? updatedAuthenticatedUser : false;
                                        if (updatedAuthenticatedUser) {
                                            if (me.getDebug()) {
                                                console.log('Debug: X.controller.mixin.Friend: fetchFriendsFromServerForPhoneNumbersOfDeviceContactsAndSetFriendsStore(): About to update the authenticated user: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                            }
                                            
                                            me.loadAuthenticatedUserStore(successCallback || false);
                                        }
                                    }
                                },
                                scope: me
                            }
                        });
                    }
                },
                scope: me
            }
        });
    },
    xhrUpdateFriendsOnServerForGivenPhoneNumbers: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Friend.xhrUpdateFriendsOnServerForGivenPhoneNumbers(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var successCallback = false,
                failureCallback = false,
                callback = false;
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(options) {
            
            var phoneNumbers = 'phoneNumbers' in options ? options.phoneNumbers : false;
            phoneNumbers = Ext.isArray(phoneNumbers) ? phoneNumbers : false;
            if (phoneNumbers) {

                successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
                failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
                callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;

                //        Parse: https://www.parse.com/docs/rest#users-signup
                var parseMetaData = me.getParseMetaData({
                    typeOfRequest: 'setFriendsForPhoneNumbers'
                }),
                        shouldMakeRequest = parseMetaData.shouldMakeRequest;
                shouldMakeRequest = Ext.isBoolean(shouldMakeRequest) ? shouldMakeRequest : false;
                if (shouldMakeRequest) {

                    var url = parseMetaData.url,
                            method = parseMetaData.method,
                            headers = parseMetaData.headers;

                    var params = Ext.encode({
                        phoneNumbers: phoneNumbers.join(',')
                    });
                    
                    Ext.Ajax.request({
                        url: url,
                        method: method,
                        headers: headers,
                        params: params,
                        success: function(serverResponse) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.Friend.xhrUpdateFriendsOnServerForGivenPhoneNumbers(): Successful. Received serverResponse:');
                                console.log(serverResponse);
                                console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            
                            var serverResponseObject = Ext.decode(serverResponse.responseText);
                            serverResponseObject = (Ext.isObject(serverResponseObject) && !Ext.isEmpty(serverResponseObject)) ? serverResponseObject : false;
                            if(serverResponseObject) {
                                
                                var userWithUpdatedFriends = 'result' in serverResponseObject ? serverResponseObject.result : false;
                                userWithUpdatedFriends = (Ext.isObject(userWithUpdatedFriends) && !Ext.isEmpty(userWithUpdatedFriends)) ? userWithUpdatedFriends : false;
                                if(userWithUpdatedFriends) {
                                    
                                    if (successCallback) {

                                        successCallback.arguments = {
                                            userWithUpdatedFriends: userWithUpdatedFriends
                                        };

                                        me.executeCallback(successCallback);

                                        callback && me.executeCallback(callback);
                                        
                                        return;
                                    }
                                }
                            }
                            
                            failureCallback && me.executeCallback(failureCallback);
                        
                            callback && me.executeCallback(callback);
                        },
                        failure: function(serverResponse) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.Friend.xhrUpdateFriendsOnServerForGivenPhoneNumbers(): Failed. Received serverResponse:');
                                console.log(serverResponse);
                                console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }

                            //                    TEMPLATE: Use this as a template to extract information from Parse's response
                            //                    var operationStatus = serverResponse.status,
                            //                            operationStatusText = serverResponse.statusText;
                            //
                            var serverResponseText = Ext.decode(serverResponse.responseText),
                                    serverResponseCode = serverResponseText.code,
                                    serverResponseError = serverResponseText.error;

                            me.generateFailedAuthenticationWindow({
                                message: serverResponseError
                            });
                            
                            failureCallback && me.executeCallback(failureCallback);
                        
                            callback && me.executeCallback(callback);
                        }
                    });
                    
                    return me;
                }
                else {
                    me.generateFailedAuthenticationWindow({
                        message: parseMetaData.message
                    });
                }
            }
        }
        
        failureCallback && me.executeCallback(failureCallback);
        
        callback && me.executeCallback(callback);
        
        return false;
    },
    /*
     * LOAD
     */
    //    Use this method to load the Friend User store; avoid loading
    //    the store directly from outside using store.load(). Use this wrapper
    //    instead
    //    
    //    Event handler 'onBeforeLoad' on the store will make sure that
    //    the where clause gets set up correctly
    loadFriendsStore: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Friend: loadFriendsStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
        
        var friendsStore = Ext.getStore('FriendsStore');
        friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
        if (friendsStore) {

            friendsStore.load(function(records, operation, success) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.Friend: loadFriendsStore(): Success: ' + success + ': Records received:');
                    console.log(records);
                    console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }

                if (success) {
                    if(successCallback) {
                        
                        successCallback.arguments = {
                            friends: records
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
    }
});
