Ext.define('X.controller.mixin.User', {
    /*
     * LOAD
     */
    //    Use this method to load the Authenticated User store; avoid loading
    //    the store directly from outside using store.load(). Use this wrapper
    //    instead
    //    
    //    Event handler 'onBeforeLoad' on the store will make sure that
    //    the session header and url endpoint get set up correctly
    //    Event handler 'onLoad' on the store will make sure that that all
    //    groups stores are automatically updated
    loadAuthenticatedUserStore: function(existsCallback, doesNotExistCallback) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var parseSessionStore = Ext.getStore('ParseSessionStore');
        if (Ext.isObject(parseSessionStore)) {

            var session = parseSessionStore.getSession();
            if (Ext.isObject(session) && !Ext.isEmpty(session)) {

                var userIdFromSession = ('userId' in session && Ext.isString(session.userId) && !Ext.isEmpty(session.userId)) ? session.userId : false;
                if (userIdFromSession) {

                    var sessionToken = ('sessionToken' in session && Ext.isString(session.sessionToken) && !Ext.isEmpty(session.sessionToken)) ? session.sessionToken : false;
                    if (sessionToken) {

                        var authenticatedUserStore = Ext.getStore('AuthenticatedUserStore');
                        if (Ext.isObject(authenticatedUserStore)) {

                            authenticatedUserStore.load(function(records, operation, success) {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Success: ' + success + ': Records received:');
                                    console.log(records);
                                    console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }

                                if (success) {
                                    if (!Ext.isEmpty(records)) {
                                        //                        This sets up references on X e.g. X.authenticatedUser
                                        me.setReferencesOnXToGivenAuthenticatedUser(records[0]);

                                        //                                        Load device contacts store if it hasn't already loaded
                                        //                                        Don't read from the device's contacts for the moment, just
                                        //                                        load from local storage. We want to minimize reads from the device's
                                        //                                        contacts unless the user explciitly clicks on the "find frinds" button
                                        //                                        in the user's account information view
                                        //                                        me.loadDeviceContactsStore();

                                        me.executeCallback(existsCallback);
                                    }
                                }
                                else {
                                    me.executeCallback(doesNotExistCallback);
                                }
                            });

                            return me;
                        }
                    }
                }
            }
        }

        me.executeCallback(doesNotExistCallback);

        return false;
    },
    /*
     * SAVE
     */
    saveAuthenticatedUser: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var successCallback = false,
                failureCallback = false,
                callback = false;

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {

            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
        }

        var authenticatedUser = X.authenticatedUser;
        if (Ext.isObject(authenticatedUser)) {
            var typeOfSave = ('typeOfSave' in options && Ext.isString(options.typeOfSave) && !Ext.isEmpty(options.typeOfSave)) ? options.typeOfSave : 'edit';

            var hasBeenValidated = ('validated' in options && Ext.isBoolean(options.validated)) ? options.validated : false;
            if (typeOfSave !== 'destroy' && !hasBeenValidated) {
                var errors = authenticatedUser.validate();
                if (!errors.isValid()) {
                    authenticatedUser.reject();
                    me.generateUserFailedUpdatedWindow({
                        message: errors.getAt(0).
                                getMessage()
                    });

                    return false;
                }
            }

            var silent = ('silent' in options && Ext.isBoolean(options.silent)) ? options.silent : false;

            var optionsToSaveOperation = {
                success: function(record, operation) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success. Received serverResponse:');
                        console.log(operation.getResponse());
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }

                    me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                        operation: operation,
                        model: authenticatedUser,
                        silent: silent
                    });

                    successCallback && me.executeCallback(successCallback);

                    callback && me.executeCallback(callback);
                },
                failure: function(record, operation) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received serverResponse:');
                        console.log(operation.getResponse());
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }

                    me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                        operation: operation,
                        model: authenticatedUser,
                        silent: silent
                    });

                    failureCallback && me.executeCallback(failureCallback);

                    callback && me.executeCallback(callback);
                }
            };

            switch (typeOfSave) {
                case 'edit':
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Will call save(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    authenticatedUser.save(optionsToSaveOperation);
                    break;
                case 'destroy':
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Will call erase(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    authenticatedUser.erase(optionsToSaveOperation);
                    break;
                default:
                    break;
            }
        }
    },
    /*
     * HELPERS
     */
    //    This sets a variable on X that stores reference to the authenticated user for easy access
    //    Note that we are using X.authenticatedEntity for now; the plan is to retire that variable and use
    //    X.authenticatedUser exclusively
    setReferencesOnXToGivenAuthenticatedUser: function(authenticatedUser) {
        X.authenticatedUser = authenticatedUser;
        //        TODO: Retire authenticatedEntity and use only authenticatedUser
        X.authenticatedEntity = authenticatedUser;
    },
    //    Does opposite of what this.setReferencesOnXToGivenAuthenticatedUser() does
    resetReferencesOnXToGivenAuthenticatedUser: function() {
        X.authenticatedUser = null;
        //        TODO: Retire authenticatedEntity and use only authenticatedUser
        X.authenticatedEntity = null;
    },
    //    This uses this.checkIfAuthenticatedUserExists() and this.loadAuthenticatedUserStore() to perform the logic
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
    //    This uses this.checkIfAuthenticatedUserExists() and this.loadAuthenticatedUserStore() to perform the logic
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

        return me;
    },
    //    This checks X.authenticatedUser to verify whether an authenticated user exists
    checkIfAuthenticatedUserExists: function(existsCallback, doesNotExistCallback) {
        var me = this;
        if (Ext.isObject(X.authenticatedUser)) {
            me.executeCallback(existsCallback);
            return true;
        }
        else {
            me.executeCallback(doesNotExistCallback);
            return false;
        }
        return me;
    }
});
