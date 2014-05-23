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
                
                var url = null, 
                        method = null,
                        headers = null;
                
                switch (typeOfRequest) {
//                    https://www.parse.com/docs/rest#users-signup
                    case 'signup':
                        url = parseConfigEndpoint + parseConfig.SIGNUP.ENDPOINT;
                        method = parseConfig.SIGNUP.METHOD,
                        headers = {
                            'Content-Type': 'application/json',
                            'X-Parse-Application-Id': applicationId,
                            'X-Parse-REST-API-Key': restApiKey,
                            'X-Parse-Session-Token': sessionToken
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
                        url = parseConfigEndpoint + parseConfig.ME.ENDPOINT;
                        method = parseConfig.ME.METHOD,
                        headers = {
                            'X-Parse-Application-Id': applicationId,
                            'X-Parse-REST-API-Key': restApiKey,
                            'X-Parse-Session-Token': sessionToken
                        };
                        break;
                    default:
                        break;
                }
                return {
                    url: url,
                    method: method,
                    headers: headers
                };
            }
        }

        return false;
    }
});
