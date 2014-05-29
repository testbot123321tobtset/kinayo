Ext.define('X.model.Message', {
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
                name: 'createdBy'
            },
            {
                name: 'groupId'
            }
            
        ],
        belongsTo: [
            {
                model: 'X.model.Group',
                foreignKey: 'groupId'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'id'
            },
            {
                type: 'presence',
                field: 'createdBy'
            },
            {
                type: 'presence',
                field: 'groupId'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: false,
            url: X.config.Config.getPARSE().ENDPOINT + 'user/groups/',
            batchActions: false,
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
