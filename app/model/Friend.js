Ext.define('X.model.Friend', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'id'
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
                name: 'friendedId'
            },
            {
                name: 'usernameEmail',
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
        hasMany: [
            {
//                We only show groups that are either created by the authenticated user
//                or ones that the authenticated user is a member of. But, authenticated user
//                can only be part of groups that are either created by the authenticated user
//                himself/herself or created by his/her friends. So a friend can have groups as well
                model: 'X.model.Group'
            }
        ],
        belongsTo: [
            {
                model: 'X.model.AuthenticatedUser',
                foreignKey: 'friendedId'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'id'
            },
            {
                type: 'presence',
                field: 'friendedId'
            },
            {
                type: 'email',
                field: 'usernameEmail'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: false,
            url: X.config.Config.getPARSE().ENDPOINT + 'user/friends',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
            },
            exception: function(proxy, response, operation, eOpts) {
                Ext.Viewport.fireEvent('friendproxyexception', {
                    proxy: proxy,
                    response: response,
                    operation: operation
                });
            }
        }
    }
});
