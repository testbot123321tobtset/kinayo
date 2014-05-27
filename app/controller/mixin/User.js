Ext.define('X.controller.mixin.User', {
    
//    This expects:
//    {
//      user: <Object>
//    }
//    This does: 
//      1. sets session: calls setSession()
//      2. sets authenticated user: calls setAuthenticatedUser()
    logUserIn: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.logUserIn(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(Ext.isObject(options)) {
            var user = ('user' in options && Ext.isObject(options.user) && !Ext.isEmpty(options.user)) ? options.user : false;
            if(Ext.isObject(user)) {
                var unSyncedAuthenticatedUser = Ext.create('X.model.AuthenticatedUser', user);
                if(Ext.isObject(unSyncedAuthenticatedUser) && 'isValid' in unSyncedAuthenticatedUser && unSyncedAuthenticatedUser.isValid()) {
                    return me.setSession({
                        user: unSyncedAuthenticatedUser
                    }) && me.setAuthenticatedUser({
                        user: unSyncedAuthenticatedUser
                    });
                }
            }
        }
        
        return false;
    },
    
//    This expects:
//    {
//      user: <'AuthenticatedUser' model instance>
//    }
//    Updates session localstorage
    setSession: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.setSession(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (Ext.isObject(options)) {
            var user = ('user' in options && Ext.isObject(options.user) && !Ext.isEmpty(options.user)) ? options.user : false;
            if (Ext.isObject(user)) {
                var objectId = user.get('objectId'),
                        userId = (Ext.isString(objectId) && !Ext.isEmpty(objectId)) ? objectId : false;
                if (userId) {
                    var sessionToken = user.get('sessionToken');
                    sessionToken = (Ext.isString(sessionToken) && !Ext.isEmpty(sessionToken)) ? sessionToken : false;
                    if (sessionToken) {
                        var parseSessionStore = Ext.getStore('ParseSessionStore');
                        if (Ext.isObject(parseSessionStore)) {
                            parseSessionStore.setSession({
                                userId: userId,
                                sessionToken: sessionToken
                            });
                            
                            return me;
                        }
                    }
                }
            }
        }
        
        return false;
    },
    
//    This expects:
//    {
//      user: <'AuthenticatedUser' model instance>
//    }
//    This does: 
//      1. updates authenticated user store
//      2. sets X.authenticatedUser
    setAuthenticatedUser: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.setAuthenticatedUser(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(Ext.isObject(options)) {
            var user = ('user' in options && Ext.isObject(options.user) && !Ext.isEmpty(options.user)) ? options.user : false;
            if(Ext.isObject(user) && !Ext.isEmpty(user)) {
                var authenticatedUserStore = Ext.getStore('AuthenticatedUserStore');
                if(Ext.isObject(authenticatedUserStore)) {
                    if (authenticatedUserStore.locallySetGivenUserAsAutheticatedUser(user)) {
                        X.authenticatedUser = user;
//                        Retire authenticatedEntity and use only authenticatedUser
                        X.authenticatedEntity = user;
                        
                        return me;
                    }
                }
            }
        }
        
        return false;
    },
    
    
    
    syncLocalAuthenticatedUserFromServer: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.updatedSaveAuthenticatedUser(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        options = Ext.isObject(options) ? options : false;
        if (Ext.isObject(options)) {
            var user = ('user' in options && Ext.isObject(options.user) && !Ext.isEmpty(options.user)) ? option.user : false;
            if (Ext.isObject(user)) {
                var errors = user.validate();
                if (!errors.isValid()) {
                    user.reject();
                    me.generateUserFailedUpdatedWindow({
                        message: errors.getAt(0).
                                getMessage()
                    });
                    return false;
                }
                else {
                    var silent = (Ext.isObject(options) && Ext.isBoolean(options.silent)) ? options.silent : false;
                    authenticatedUser.save({
                        success: function(record, operation) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success. Received serverResponse:');
                                console.log(operation.getResponse());
                                console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            if (Ext.isString(operation.getResponse().responseText)) {
                                var serverResponse = Ext.decode(operation.getResponse().responseText);
                                var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                                var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                                var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                                if (serverResponseSuccess) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (!serverResponseMessage) {
                                        if (me.getDebug()) {
                                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                        }
                                    }
                                    else {
                                        if (me.getDebug()) {
                                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                        }
                                    }
                                }
                            }
                            me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                                operation: operation,
                                model: authenticatedUser,
                                message: serverResponseMessage,
                                silent: silent
                            });
                        },
                        failure: function(record, operation) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received serverResponse:');
                                console.log(operation.getResponse());
                                console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            if (Ext.isString(operation.getResponse().responseText)) {
                                var serverResponse = Ext.decode(operation.getResponse().responseText);
                                var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                                var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                                var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                                if (!serverResponseSuccess) {
                                    if (!serverResponseMessage) {
                                        if (me.getDebug()) {
                                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                        }
                                    }
                                    else {
                                        if (me.getDebug()) {
                                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                        }
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                            me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                                operation: operation,
                                model: authenticatedUser,
                                message: serverResponseMessage,
                                silent: silent
                            });
                        }
                    });
                }
            }
        }
        
        return false;
    },
    
    saveAuthenticatedUser: function(options) {
        var me = this;
        var authenticatedUser = me.getAuthenticatedUser();
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (Ext.isObject(authenticatedUser)) {
            var errors = authenticatedUser.validate();
            if (!errors.isValid()) {
                authenticatedUser.reject();
                me.generateUserFailedUpdatedWindow({
                    message: errors.getAt(0).
                            getMessage()
                });
                return false;
            }
            else {
                var silent = (Ext.isObject(options) && Ext.isBoolean(options.silent)) ? options.silent : false;
                authenticatedUser.save({
                    success: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        if (Ext.isString(operation.getResponse().responseText)) {
                            var serverResponse = Ext.decode(operation.getResponse().responseText);
                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                            if (serverResponseSuccess) {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            }
                            else {
                                if (!serverResponseMessage) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                        }
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: authenticatedUser,
                            message: serverResponseMessage,
                            silent: silent
                        });
                    },
                    failure: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        if (Ext.isString(operation.getResponse().responseText)) {
                            var serverResponse = Ext.decode(operation.getResponse().responseText);
                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                            if (!serverResponseSuccess) {
                                if (!serverResponseMessage) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                            else {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            }
                        }
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: authenticatedUser,
                            message: serverResponseMessage,
                            silent: silent
                        });
                    }
                });
            }
        }
        else {
            return false;
        }
        return me;
    },
    checkLoginAndResumeIfNotExistsOrRedirectIfExists: function(action) {
        var me = this;
        me.checkIfAuthenticatedUserExists({
            // Callback if authenticated user exists
            fn: function() {
                if (me.getUrlHash() !== X.XConfig.getDEFAULT_USER_PAGE()) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfNotExistsOrRedirectIfExists(): Authenticated user exists. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_USER_PAGE() = ' + X.XConfig.getDEFAULT_USER_PAGE() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    me.redirectTo(X.XConfig.getDEFAULT_USER_PAGE());
                }
            },
            scope: me
        },
        {
            // Callback if authenticated user does not exist
            fn: function() {
                me.loadAuthenticatedUserStore({
                    // Callback if authenticated user exists
                    fn: function() {
                        if (me.getUrlHash() !== X.XConfig.getDEFAULT_USER_PAGE()) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_USER_PAGE() = ' + X.XConfig.getDEFAULT_USER_PAGE() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            me.redirectTo(X.XConfig.getDEFAULT_USER_PAGE());
                        }
                    },
                    scope: me
                },
                {
                    // Callback if authenticated user does not exist
                    fn: function() {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfNotExistsOrRedirectIfExists(): Authenticated user does not exist. Will do action.resume(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        action.resume();
                    },
                    scope: me
                });
            },
            scope: me
        });
    },
    checkLoginAndResumeIfExistsOrRedirectIfNotExists: function(action) {
        var me = this;
        me.checkIfAuthenticatedUserExists({
            // Callback if authenticated user exists
            fn: function() {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Will do action.resume(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                action.resume();
            },
            scope: me
        },
        {
            // Callback if authenticated user does not exist
            fn: function() {
                me.loadAuthenticatedUserStore({
                    // Callback if authenticated user exists
                    fn: function() {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Will do action.resume(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        action.resume();
                    },
                    scope: me
                },
                {
                    // Callback if authenticated user does not exist
                    fn: function() {
                        if (me.getUrlHash() !== X.XConfig.getDEFAULT_LOGIN_PAGE()) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user does not exist. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_LOGIN_PAGE() = ' + X.XConfig.getDEFAULT_LOGIN_PAGE() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            me.redirectTo(X.XConfig.getDEFAULT_LOGIN_PAGE());
                        }
                    },
                    scope: me
                });
            },
            scope: me
        });
    },
    getAuthenticatedUser: function() {
        var me = this;
        if (Ext.isBoolean(X.isUser) && X.isUser && Ext.isBoolean(X.authenticated) && X.authenticated && Ext.isObject(X.authenticatedEntity)) {
            return X.authenticatedEntity;
        }
        else {
            return false;
        }
        return me;
    },
    checkIfAuthenticatedUserExists: function(existsCallback, doesNotExistCallback) {
        var me = this;
        if (Ext.isObject(me.getAuthenticatedUser())) {
            me.executeCallback(existsCallback);
            return true;
        }
        else {
            me.executeCallback(doesNotExistCallback);
            return false;
        }
        return me;
    },
    isAuthenticatedUserIdSameAsGivenUserId: function(userId) {
        var me = this;
        if (Ext.isObject(me.getAuthenticatedUser())) {
            var authenticatedUser = me.getAuthenticatedUser();
            if (authenticatedUser.getId() === userId) {
                return X.authenticatedEntity;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        return me;
    },
    loadAuthenticatedUserStore: function(existsCallback, doesNotExistCallback, emptyAuthenticatedBrandStore) {
        var me = this;
        emptyAuthenticatedBrandStore = Ext.isBoolean(emptyAuthenticatedBrandStore) ? emptyAuthenticatedBrandStore : true;
        var authenticatedUserStore = Ext.getStore('AuthenticatedUserStore');
        authenticatedUserStore.load(function(records, successful) {
            if (!successful) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Operation failed: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                var rawResponse = authenticatedUserStore.getProxy().
                        getReader().rawData;
                if (!rawResponse.success) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Message from server: ' + rawResponse.message + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                }
                X.isUser = false;
                X.authenticated = false;
                X.authenticatedEntity = false;
                X.authenticatedEntityWebsocketToken = false;
                me.executeCallback(doesNotExistCallback);
            }
            else {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Operation succeeded: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                if (Ext.isArray(records) && records.length > 0) {
                    var authenticatedUser = records[0];
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Authenticated user:');
                        console.log(authenticatedUser);
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    X.isUser = true;
                    X.authenticated = true;
                    X.authenticatedEntity = authenticatedUser;
                    me.loadGroupsStore();
                    me.executeCallback(existsCallback);
                }
                else {
                    var rawResponse = authenticatedUserStore.getProxy().
                            getReader().rawData;
                    if (Ext.isObject(rawResponse) && !rawResponse.success) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Message from server: ' + rawResponse.message + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                    }
                    X.isUser = false;
                    X.authenticated = false;
                    X.authenticatedEntity = false;
                    X.authenticatedEntityWebsocketToken = false;
                    me.executeCallback(doesNotExistCallback);
                }
            }
        });
        return me;
    }
});
