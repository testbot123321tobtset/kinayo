Ext.define('X.controller.mixin.Parse', {
    getParseMetaData: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Parse: getHeaders(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {
            var typeOfRequest = ('typeOfRequest' in options && Ext.isString(options.typeOfRequest) && options.typeOfRequest.length > 0) ? options.typeOfRequest : false;
            if (typeOfRequest) {
                var config = X.XConfig,
                        parseConfig = config.getPARSE(),
                        parseConfigEndpoint = parseConfig.ENDPOINT;
                
                var applicationId = parseConfig.APPLICATION_ID,
                        restApiKey = parseConfig.REST_API_KEY,
                        sessionToken = Ext.getStore('ParseSessionStore').getToken();
                
                var shouldMakeRequest = true, // Set this to false if any of the conditions are not met in the switch underneath
                        message = null;
                
                if(Ext.isString(applicationId) && applicationId.length > 0 && Ext.isString(restApiKey) && restApiKey.length > 0) {
                    var url = null, 
                        method = null,
                        headers = null;
                
                    switch (typeOfRequest) {
//                    https://www.parse.com/docs/rest#users-signup
                        case 'signup':
                            url = parseConfigEndpoint + parseConfig.SIGNUP.ENDPOINT;
                            method = parseConfig.SIGNUP.METHOD,
                                    headers = {
                                        'Content-Type': 'application/json;charset=utf-8',
                                        'X-Parse-Application-Id': applicationId,
                                        'X-Parse-REST-API-Key': restApiKey
                                    };
                            break;
//                    https://www.parse.com/docs/rest#users-login
                        case 'login':
                            url = parseConfigEndpoint + parseConfig.LOGIN.ENDPOINT;
                            method = parseConfig.LOGIN.METHOD,
                                    headers = {
                                        'X-Parse-Application-Id': applicationId,
                                        'X-Parse-REST-API-Key': restApiKey
                                    };
                            break;
//                    https://www.parse.com/docs/rest#users-validating
                        case 'me':
                            if (Ext.isString(sessionToken)) {
                                url = parseConfigEndpoint + parseConfig.ME.ENDPOINT;
                                method = parseConfig.ME.METHOD,
                                        headers = {
                                            'X-Parse-Application-Id': applicationId,
                                            'X-Parse-REST-API-Key': restApiKey,
                                            'X-Parse-Session-Token': sessionToken
                                        };
                            }
                            else {
                                shouldMakeRequest = false;
                                message = 'X-Parse-Session-Token not found: no point making a call to "me" endpoint';
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    shouldMakeRequest = false;
                    message = 'One or both of X-Parse-Application-Id and X-Parse-REST-API-Key not found';
                }
                return {
                    url: url,
                    method: method,
                    headers: headers,
                    shouldMakeRequest: shouldMakeRequest,
                    message: message
                };
            }
        }

        return false;
    }
});
