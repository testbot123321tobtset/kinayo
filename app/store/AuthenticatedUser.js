Ext.define('X.store.AuthenticatedUser', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.AuthenticatedUser',
        storeId: 'AuthenticatedUserStore',
        autoLoad: false,
        autoSync: false
    },
    //    
    //    EVENT HANDLERS

    //    Before the store loads, this makes sure that the record contained in this store (alongwith the
    //    url and the session header of the store) are in sync. If not, this removes the existing authenticated user 
    //    in the store and continues loading the one referred to by the session
    onBeforeLoad: function(store, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var parseSessionStore = Ext.getStore('ParseSessionStore');
        if (Ext.isObject(parseSessionStore)) {
            
            var session = parseSessionStore.getSession();
            if (Ext.isObject(session) && !Ext.isEmpty(session)) {
                
                var userIdFromSession = ('userId' in session && Ext.isString(session.userId) && !Ext.isEmpty(session.userId)) ? session.userId : false;
                if (userIdFromSession) {
                    
                    var sessionToken = ('sessionToken' in session && Ext.isString(session.sessionToken) && !Ext.isEmpty(session.sessionToken)) ? session.sessionToken : false;
                    if (sessionToken) {
                        
                        var isAuthenticatedUserStoreEmpty = me.isEmpty();
                        if (!isAuthenticatedUserStoreEmpty) {
                            //                            When authenticated user store is not empty, check if the user in store
                            //                            is the same as the one in the session. If it is, then proceed with refreshing
                            //                            of the authenticated user store. If not, then remove the existing record from
                            //                            the authenticated user store, and then proceed with the load
                            var authenticatedUser = me.getAt(0);
                            var authenticatedUserId = authenticatedUser.get('objectId');
                            if (authenticatedUserId !== userIdFromSession) {
                                authenticatedUser.destroy();
                                authenticatedUser.commit();
                            }
                        }

                        me.setUrlPostfixEndpoint(userIdFromSession);
                        me.setSessionHeaderForAllStores(sessionToken);

                        me.callParent(arguments);
                    }
                }
            }
        }
    },
    //    Every time the authenticated user store loads, make sure that you take the group information from this store and 
    //    update all group data stored in all of the group stores locally
    onLoad: function(me, records, successful, operation, eOpts) {
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        //        Refresh all group stores
        if (successful) {
            var authenticatedUser = records[0];
            authenticatedUser = (Ext.isObject(authenticatedUser) && !Ext.isEmpty(authenticatedUser)) ? authenticatedUser : false;
            if (authenticatedUser) {
                var sessionToken = authenticatedUser.get('sessionToken');
                sessionToken = (Ext.isString(sessionToken) && !Ext.isEmpty(sessionToken)) ? sessionToken : false;
                if (sessionToken) {
                    me.setSessionHeaderForAllStores(sessionToken);
                    //                    This is a one-way update. Changes made to the group stores from elsewhere
                    //                    doesn't sync back to this array
                    //                    Don't rely on this to get the relevant groups – always use the group
                    //                    stores. For instance when a group is created by the user, the arrays in
                    //                    authenticated user are not updated
                    authenticatedUser.updateAllGroupStores();
                    authenticatedUser.updateFriendsStore();
                }

                Ext.Viewport.fireEvent('authenticateduserstoreload', {
                    me: me,
                    authenticatedUser: authenticatedUser
                });
            }
        }

        me.callParent(arguments);
    },
    //    This sets the url such that the endpoint refers to the objectId of the user currently in session
    //    This is needed to perform any updates using store.sync()
    setUrlPostfixEndpoint: function(endpoint) {
        var me = this;

        me.getProxy().
                setUrl(X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT + '/' + endpoint);

        return me;
    },
    //    This resets what setUrlPostfixEndpoint() does
    resetUrlPostfixEndpoint: function() {
        var me = this;

        me.getProxy().
                setUrl(X.config.Config.getPARSE().ENDPOINT + X.config.Config.getPARSE().USERS.ENDPOINT);

        return me;
    },
    //    This does callParent(arguments)
    reset: function() {
        var me = this;

        me.resetUrlPostfixEndpoint();
        var authenticatedUser = me.getAt(0);
        if (Ext.isObject(authenticatedUser)) {
            authenticatedUser.destroy();
            authenticatedUser.commit();
        }

        me.callParent(arguments);
    }
});
