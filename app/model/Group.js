Ext.define('X.model.Group', {
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
            },
            {
                model: 'X.model.Friend',
                foreignKey: 'createdById',
                getterName: 'getCreator'
            }
        ],
        hasMany: [
            {
                model: 'X.model.Message'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'id'
            },
            {
                type: 'presence',
                field: 'title',
                message: 'We need you to, at the very least, give this group a title.'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: true,
            url: X.config.Config.getPARSE().ENDPOINT + 'user/groups',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
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
        return this.get('createdById') === X.authenticatedEntity.get('id');
    },
//    Websocket
    joinRoom: function(xSocket) {
        var me = this;
        if(X.config.Config.getDEBUG()) {
            console.log('Debug: X.model.Group.joinRoom(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        xSocket = Ext.isObject(xSocket) ? xSocket : X.Socket;
        if(Ext.isObject(xSocket)) {
            xSocket.emit('enterRoom', {
                roomName: me.get('id')
            });
            return me;
        }
        
        return false;
    }
});
