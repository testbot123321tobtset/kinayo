Ext.define('X.model.AuthenticatedUser', {
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
            url: X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().ME.ENDPOINT,
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
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
//    ,
////    TODO: This should have the code to subscribe to a Parse channel
//    joinRoom: function(xSocket) {
//        var me = this;
//        if(X.config.Config.getDEBUG()) {
//            console.log('Debug: X.model.AuthenticatedUser.joinRoom(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//        }
//        
//        xSocket = Ext.isObject(xSocket) ? xSocket : X.Socket;
//        if(Ext.isObject(xSocket)) {
//            xSocket.emit('enterRoom', {
//                roomName: me.get('id')
//            });
//            return me;
//        }
//        
//        return false;
//    }
});
