Ext.define('X.model.User', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'objectId'
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
                type: 'email',
                field: 'email'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'objectId',
            appendId: true,
            url: X.config.Config.getPARSE().ENDPOINT + 'users',
            batchActions: true,
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
