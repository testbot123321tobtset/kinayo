Ext.define('X.model.Group', {
    extend: 'X.model.Application',
    requires: [
        'Ext.data.proxy.Rest'
    ],
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
            },
            {
                name: 'hasMemberUsers'
            }
        ],
        belongsTo: [
            //            We only show groups that are either created by the authenticated user
            //            or ones that the authenticated user is a member of. But, authenticated user
            //            can only be part of groups that are either created by the authenticated user
            //            himself/herself or created by his/her friends. So a friend can have groups as well
            //            You can't have 2 getters with the same name, but a group can be created by either
            //            the authenticated user or a friend. So, we have 2 getters and doing:
            //                  var createdBy = group.getCreatorWhoIsTheAuthenticatedUser() || group.getCreatorWhoIsAFriend()
            //            should give you back the correct user record. i haven't tried it yet, so confirm this!
            //            TODO
            {
                model: 'X.model.AuthenticatedUser',
                foreignKey: 'createdById',
                getterName: 'getCreatorWhoIsTheAuthenticatedUser'
            },
            {
                model: 'X.model.Friend',
                foreignKey: 'createdById',
                getterName: 'getCreatorWhoIsAFriend'
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
            //            We don't need to pull the whole _User objects; the members must be in the 
            //            authenticated user's friends list. So we can query for users from friends store
            //            with the objectIds we receive from this GET call on group
            //                        extraParams: {
            //                            include: 'hasMemberUsers'
            //                        },
            reader: {
                type: 'json',
                rootProperty: 'results'
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
    },
    getMembers: function() {
        var me = this;
        
        var membersFound = false;
        
        var members = me.get('hasMemberUsers');
        members = (Ext.isArray(members) && members.length > 0) ? members : false;
        if(members) {
            
            var friendsStore = Ext.getStore('FriendsStore');
            friendsStore = (Ext.isObject(friendsStore) && friendsStore.getAllCount() > 0) ? friendsStore : false;
            if (friendsStore) {
                
                membersFound = [];
                
                Ext.Array.each(members, function(thisMember) {
                    
                    thisMember = '__type' in thisMember ? thisMember : false;
                    if(thisMember) {
                        
                        var objectId = 'objectId' in thisMember ? thisMember.objectId : false;
                        if (objectId) {
                            objectId = (Ext.isString(objectId) && !Ext.isEmpty(objectId)) ? objectId : false;
                            if (objectId) {
                                
                                var memberFound = friendsStore.getById(thisMember.objectId);
                                memberFound = (Ext.isObject(memberFound) && !Ext.isEmpty(memberFound)) ? memberFound : false;
                                if(memberFound) {
                                    
                                    membersFound.push(memberFound);
                                }
                            }
                        }
                    }
                });
            }
        }
        
        return membersFound;
    },
    getMemberObjectIds: function() {
        var me = this;
        
        var memberObjectIds = false;
        
        var members = me.get('hasMemberUsers');
        members = Ext.isArray(members) ? members : false;
        if(members) {
            
            memberObjectIds = [];
            if(members.length > 0) {
                
                Ext.Array.each(members, function(thisMember) {
                    
                    memberObjectIds.push(thisMember.objectId);
                });
            }
        }
        
        return memberObjectIds;
    },
    setHasMemberUsersFieldForGivenUsers: function(users) {
        var me = this;
        
        users = Ext.isArray(users) ? users : false;
        if(users) {
            
            //            Template for how every object in hasMemberUsers field must look like:
            //            
            //            [{"__type":"Pointer","className":"_User","objectId":"ozI0Up5tSD"}]
            var pointers = [];
            
            Ext.Array.each(users, function(thisUser) {
                pointers.push({
                    
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": thisUser.get('objectId')
                });
            });
            
            me.set('hasMemberUsers', pointers);
        }
        
        return me;
    }
});
