Ext.define('X.model.AuthenticatedUser', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'objectId',
//                Don't persist this, because URLs to the server contain the resource to be updated
//                and not the body of the data itself – Parse doesn't refer to the objectId passed inside
//                of the data.
//                Also, Parse doesn't like sending objectId at the time of creation, and Sencha Touch
//                has to have one when a model is instantiated. Not sending the objectId is the 
//                only solution to the problem. After the first create, the record is automatically
//                updated with the data received from the server, and so the objectId is updated as well
//                persist: false
            },
            {
                name: 'createdAt',
                type: 'date',
                dateFormat: 'c',
                persist: false
            },
            {
                name: 'updatedAt',
                type: 'date',
                dateFormat: 'c',
                persist: false
            },
            {
                name: 'username',
                type: 'string'
            },
            {
                name: 'email',
                type: 'string'
            },
            {
                name: 'firstName',
                type: 'string'
            },
            {
                name: 'lastName',
                type: 'string'
            },
            {
                name: 'fullName',
                type: 'string',
                convert: function(value, record) {
                    return (Ext.isString(record.get('firstName')) && Ext.isString(record.get('lastName'))) ? record.get('firstName') + ' ' + record.get('lastName') : null;
                },
                persist: false
            },
            {
//                Use this to map users to their session tokens 
                name: 'sessionToken',
                type: 'string',
                persist: false
            }
        ],
        hasMany: [
            {
//                This is a list of groups that the authenticated user has created
//                There can also be groups that the authenticated user had not created but is a part of
                model: 'X.model.Group'
            },
            {
                model: 'X.model.Friend'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'objectId'
            },
            {
                type: 'presence',
                field: 'username'
            },
            {
                type: 'presence',
                field: 'sessionToken'
            }
        ],
        proxy: {
            type: 'rest',
            url: X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT,
//            objectId or Id will depend on which user is in session and is set dynamically by the AuthenticatedUser store
            appendId: false,
            batchActions: true,
            reader: {
                type: 'json',
//                There is always one authenticated user, and so the resultset returned by Parse will always be of the type:
//                        {
//                            ...
//                        }
//                and not:
//                        {
//                            results: [
//                                {   
//                                    ...
//                                }
//                            ]
//                        }
                rootProperty: ''
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Parse-Application-Id': X.config.Config.getPARSE().APPLICATION_ID,
                'X-Parse-REST-API-Key': X.config.Config.getPARSE().REST_API_KEY
            },
            exception: function(proxy, response, operation, eOpts) {
                Ext.Viewport.fireEvent('authenticateduserproxyexception', {
                    proxy: proxy,
                    response: response,
                    operation: operation
                });
            }
        }
    }
});
