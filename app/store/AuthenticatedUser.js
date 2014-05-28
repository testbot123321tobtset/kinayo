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

                        me.callParent(arguments);
                        return me;
                    }
                }
            }
        }

//        Only load if a session is found in localstorage
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.onBeforeLoad(): Failed: Where clause in the URL could not be correctly edited: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return false;
    },
    onLoad: function(store, records, successful, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        Ext.Viewport.fireEvent('authenticateduserstoreload', {
            me: me,
            authenticatedUser: me.getAt(0)
        });

        me.callParent(arguments);
    },
//    This sets a given user as the authenticated user in the authenticated user store
//    This means that it'll relace any record in this store with the given user and
//    edit the session header and the url approporiately – all without having to sync
//    back to the server
    locallySetGivenUserAsAuthenticatedUser: function(options) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.AuthenticatedUser.locallySetGivenUserAsAuthenticatedUser(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (Ext.isObject(options)) {
            var user = ('user' in options && Ext.isObject(options.user) && !Ext.isEmpty(options.user)) ? options.user : false;
            if (Ext.isObject(user) && !Ext.isEmpty(user)) {
                me.each(function(thisUser) {
                    thisUser.destroy();
                    thisUser.commit();
                });
                me.add(user);
                user.commit();

                me.setSessionHeader(user.get('sessionToken'));
                me.setUrlPostfixEndpoint(user.get('objectId'));

                return me;
            }
        }

        return false;
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
