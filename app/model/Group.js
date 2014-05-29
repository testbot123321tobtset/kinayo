Ext.define('X.model.Group', {
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
                persist: false
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
                name: 'createdById',
                type: 'string'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            }
        ],
        belongsTo: [
            //                We only show groups that are either created by the authenticated user
            //                or ones that the authenticated user is a member of. But, authenticated user
            //                can only be part of groups that are either created by the authenticated user
            //                himself/herself or created by his/her friends. So a friend can have groups as well
            {
                model: 'X.model.AuthenticatedUser',
                foreignKey: 'createdById',
                getterName: 'getCreator'
            }
            //            Can't have 2 associations with the same getterName!!
            //            ,
            //            {
            //                model: 'X.model.Friend',
            //                foreignKey: 'createdById',
            //                getterName: 'getCreator'
            //            }
        ],
        hasMany: [
            {
                model: 'X.model.Message'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'objectId'
            },
            {
                type: 'presence',
                field: 'title',
                message: 'We need you to, at the very least, give this group a title.'
            }
        ],
        proxy: {
            type: 'rest',
            url: X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().GROUPS.ENDPOINT,
            appendId: true,
            batchActions: false,
            reader: {
                type: 'json',
                rootProperty: ''
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Parse-Application-Id': X.config.Config.getPARSE().APPLICATION_ID,
                'X-Parse-REST-API-Key': X.config.Config.getPARSE().REST_API_KEY
            },
            exception: function(proxy, response, operation, eOpts) {
                Ext.Viewport.fireEvent('groupproxyexception', {
                    proxy: proxy,
                    response: response,
                    operation: operation
                });
            }
        }
    },
    isCreatedByMe: function() {
        return this.get('createdById') === X.authenticatedUser.get('objectId');
    }
});
