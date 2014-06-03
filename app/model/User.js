Ext.define('X.model.User', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'objectId'
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
                name: 'phoneNumber',
                type: 'int'
            },
            {
                name: 'fullName',
                type: 'string',
                convert: function(value, record) {
                    return record.get('firstName') + ' ' + record.get('lastName');
                },
                persist: false
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
                field: 'phoneNumber'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'objectId',
            appendId: true,
            url: X.config.Config.getPARSE().ENDPOINT + 'users',
            batchActions: false,
            reader: {
                type: 'json',
                rootProperty: 'result'
            },
            exception: function(proxy, response, operation, eOpts) {
                Ext.Viewport.fireEvent('userproxyexception', {
                    proxy: proxy,
                    response: response,
                    operation: operation
                });
            }
        }
    }
});
