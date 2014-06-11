//
//NOTE
//
//1. Signup (CREATE User) is done independently by Ext.Ajax
//      Signup returns the newly created user with session token
//      and so login can be done immediately after a user signs up
//      i.e. no need to make a newly signed up used log in through
//      a login form again
//2. Login is done independently by Ext.Ajax
//      Login is done only when a session is not found in local storage
//      When a session is not found in local storage, a user is made to log
//      in using the login form
//3. We don't expose the log out functionality: we assume that a device can
//      only be used for a particular user, and we don't allow users to 
//      switch accounts on the same device. Keeping log out functionality
//      around is useful for development though
//4. Eventually, Signup and Login functionalities should be merged into
//      a phone number based authentication mechanism using Parse+Twilio
//5. READ, UPDATE, and DESTROY AuthenticatedUser is done via its Store

Ext.define('X.controller.Users', {
    extend: 'X.controller.Main',
    requires: [
        'X.model.validation.UserLogin',
        'X.view.plugandplay.SignupAndLoginContainer',
        'X.view.plugandplay.NonInteractiveUsersListContainer',
        'X.view.plugandplay.InteractiveUsersListContainer',
        'X.view.plugandplay.PhotoMessageInputContainer'
    ],
    config: {
        models: [
            'User',
            'AuthenticatedUser'
        ],
        stores: [
            'Users',
            'AuthenticatedUser'
        ],
        before: {
            showSignup: [
                'checkLoginAndResumeIfNotExistsOrRedirectIfExists'
            ],
            showLogin: [
                'checkLoginAndResumeIfNotExistsOrRedirectIfExists'
            ],
            showAuthenticatedMoreAccountInformation: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ]
        },
        routes: {
            // Unauthenticated
            'user/signup': 'showSignup',
            'user/login': 'showLogin',
            // Authenticated
            'user/profile/more/account': 'showAuthenticatedMoreAccountInformation'
        },
        control: {
            viewport: {
                authenticateduserloggedin: 'onAuthenticatedUserLoggedIn',
                //                authenticateduserstoreload: 'onAuthenticatedUserStoreLoad',
                authenticateduserdataedit: 'onAuthenticatedUserDataEdit',
                devicecontactsstorerefreshuserrequest: 'onDeviceContactsStoreRefreshUserRequest'
            },
            //            Login page
            signupAndLoginTabPanel: {
                activeitemchange: 'onSignupAndLoginTabPanelActiveItemChange'
            },
            //            Signup
            userSignupFormPanel: {
                fieldaction: 'doSignup'
            },
            userSignupFormSubmitButton: {
                tap: 'doSignup'
            },
            //            Login
            userLoginFormPanel: {
                fieldaction: 'doLogin'
            },
            userLoginFormSubmitButton: {
                tap: 'doLogin'
            },
            userFriendSubmitButton: {
                tap: 'doAddFriend'
            },
            // User profile root page - this comes after authentication
            pageUserRoot: {
                activeitemchange: 'onPageUserRootTabPanelPanelActiveItemChange'
            },
            userMoreTabPanel: {
                activeitemchange: 'onUserMoreTabPanelPanelActiveItemChange'
            },
            // User account info panel
            findFriendsFromDeviceContactsButton: {
                tap: 'onImportFriendsFromDeviceContactsButtonTap'
            },
            // Logout
            logoutButton: {
                tap: 'doLogout'
            },
            //            Messaging
            photoMessageInputContainerSubmitButton: {
                tap: 'onPhotoMessageInputContainerSubmitButtonTap'
            },
            photoMessageInputContainerCancelButton: {
                tap: 'onPhotoMessageInputContainerCancelButtonTap'
            }
        },
        refs: {
            // Login
            signupAndLoginContainer: '#signupAndLoginContainer',
            signupAndLoginTabPanel: '#signupAndLoginTabPanel',
            userSignupFormPanel: '#userSignupFormPanel',
            userSignupFormSubmitButton: '#userSignupFormPanel #submitButton',
            userLoginFormPanel: '#userLoginFormPanel',
            userLoginFormSubmitButton: '#userLoginFormPanel #submitButton',
            // User Friend Form Panel - for adding friends
            userFriendFormPanel: '#userFriendFormPanel',
            userFriendSubmitButton: '#userFriendFormPanel #submitButton',
            // User profile root page - this comes after authentication
            pageUserRoot: '#pageUserRoot',
            // User :: More
            userMoreTabPanel: '#userMoreTabPanel',
            userAccountFormPanel: '#userMoreTabPanel #userAccountFormPanel',
            findFriendsFromDeviceContactsButton: '#userMoreTabPanel #userAccountFormPanel #findFriendsFromDeviceContactsButton',
            // User :: Logout
            logoutButton: '#userAccountFormPanel #logoutButton',
            //            userLogoutPanel: '#userMoreTabPanel #userLogout',
            //            logoutButton: '#userMoreTabPanel #userLogout #logoutButton'
            
            //            Messaging
            photoMessageInputContainer: '#photoMessageInputContainer',
            photoMessageInputContainerFormPanel: '#photoMessageInputContainer #messageFormPanel',
            photoMessageInputContainerTextMessageField: '#photoMessageInputContainer #messageFormPanel #messageTextareaField',
            photoMessageInputContainerSubmitButton: '#photoMessageInputContainer #messageFormPanel #submitButton',
            photoMessageInputContainerCancelButton: '#photoMessageInputContainer #messageFormPanel #cancelButton'
        }
    },
    /*
     *    VIEWPORT EVENT HANDLERS
     */
    onAuthenticatedUserLoggedIn: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onAuthenticatedUserLoggedIn(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.runTask({
            fn: function() {
                if (X.config.Config.getDEBUG()) {
                    console.log('Debug: X.controller.Users.onAuthenticatedUserLoggedIn(): Will now execute callback function: Authenticated user will now join room');
                }
                me.executeCallback({
                    fn: function() {
                        X.authenticatedEntity.joinRoom();
                    },
                    scope: me
                });
            },
            condition: function() {
                return ('Socket' in X) && Ext.isObject(X.Socket);
            },
            delay: 100,
            limit: 100,
            scope: me
        });
        return me;
    },
    onAuthenticatedUserDataEdit: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onAuthenticatedUserDataEdit(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.doUpdateAuthenticatedUser(options);
    },
    onDeviceContactsStoreRefreshUserRequest: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onDeviceContactsStoreRefreshUserRequest(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        //        Refresh device contacts store, then show a window containing
        //        users list with an attached device contacts store
    },
    /*
     *    ROUTE HANDLERS
     */
    //    SIGNUP
    //    
    //    Show sign up form
    showSignup: function() {
        return this.generateAndFillViewportWithUserSignupWindow();
    },
    //    LOGIN
    //    
    //    Show login form
    showLogin: function() {
        return this.generateAndFillViewportWithUserLoginWindow();
    },
    showAuthenticatedMoreAccountInformation: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.showAuthenticatedMoreAccountInformation(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateUserMoreTabPanelAndActivateUserAccountTab();
        me.getUserAccountFormPanel().setRecord(X.authenticatedUser);
        return me;
    },
    //    LOGOUT
    //    
    //    With Parse REST API, logging out means not sending the session cookie with subsequent requests
    //    Then, when ready to log in, ask the user to fill in username and password, and the response will have the 'X-Parse-Session-Token' session header
    //    that can be used in all subsequent requests until log out; so logging out here means that you don't use that session token anymore
    //    on client side until the next log in event occurs
    //    See https://parse.com/questions/logging-users-out-with-rest-api
    //    So, when you sign someone in, store the session token received in LocalStorage using the LocalStorage proxy, so
    //    if the app crashes and the user restarts, the session can still be retrieved from the LocalStorage, which persists
    //    So, logging out means that any subsequent request to Parse's REST API should
    //    not contain the session key header, the authenticated user store's url should not have any user id
    //    as a postfix to its endpoint,  the authenticated user store must be emptied, and the 
    //    parse session localstorage store must be emptied
    doLogout: function(button, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doLogout(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.logUserOut().
                redirectTo(X.XConfig.getDEFAULT_USER_LOGIN_PAGE());

        return me;
    },
    /*
     *    OTHER EVENT HANDLERS
     */
    onSignupAndLoginTabPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        if (Ext.isObject(tabPanel) && Ext.isObject(activeItem)) {
            var urlHash = me.getUrlHash();
            if (me.getDebug()) {
                console.log('Debug: X.controller.Users.onSignupAndLoginTabPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            if (activeItem.getItemId() === 'userLogin' && me.getUrlHash() !== X.XConfig.getDEFAULT_USER_LOGIN_PAGE()) {
                me.redirectTo(X.XConfig.getDEFAULT_USER_LOGIN_PAGE());
            }
            else if (activeItem.getItemId() === 'userSignup' && me.getUrlHash() !== X.XConfig.getDEFAULT_USER_SIGNUP_PAGE()) {
                me.redirectTo(X.XConfig.getDEFAULT_USER_SIGNUP_PAGE());
            }
        }
        return me;
    },
    onPageUserRootTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        if (Ext.isObject(tabPanel) && Ext.isObject(activeItem)) {
            var urlHash = me.getUrlHash();
            if (me.getDebug()) {
                console.log('Debug: X.controller.Users.onPageUserRootTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            if (activeItem.getItemId() === 'userGroups' && urlHash !== 'user/profile/groups/feeds') {
                me.redirectTo('user/profile/groups/feeds');
            }
            else if (activeItem.getItemId() === 'userMore' && urlHash !== 'user/profile/more/account') {
                me.redirectTo('user/profile/more/account');
            }
        }
        return me;
    },
    //    USER ACCOUNT PANEL
    onUserMoreTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        if (Ext.isObject(tabPanel) && Ext.isObject(activeItem)) {
            var urlHash = me.getUrlHash();
            if (me.getDebug()) {
                console.log('Debug: X.controller.Users.onUserMoreTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            if (activeItem.getItemId() === 'userAccount' && urlHash !== 'user/profile/more/account') {
                me.redirectTo('user/profile/more/account');
            }
            else if (activeItem.getItemId() === 'userLogout' && urlHash !== 'user/profile/more/logout') {
                me.redirectTo('user/profile/more/logout');
            }
        }
        return me;
    },
    onImportFriendsFromDeviceContactsButtonTap: function() {
        var me = this;
        
        //        The logic:
        //        1. freshly read device contacts from the device and get all the phone numbers
        //        2. POST to parse cloud function setFriendsForPhoneNumbers, which if executed successfully
        //              will automatically trigger authenticated user store load
        //        3. Pass a successCallback from here which will be execute as a callback after the 
        //              authenticated user store loads
        //        4. When the authenticated user store loads, it will automatically update the friends store
        //        5. Generate the friends list in an interactive user list (so the user can pick members for her group)
        //              inside of the successCallback sent in step #3
        //        
        //        For a clearer picture of the workflow, refer to: https://docs.google.com/document/d/12HrIs4C6R0h9j1maSMkHIci4OrSnuXkNia87V_luNXI/edit?usp=sharing
        
        X.view.plugandplay.LoadingContainer.open();
        
        return me.fetchFriendsFromServerForPhoneNumbersOfDeviceContactsAndSetFriendsStore({
            
            successCallback: {
                fn: function() {
                    
                    me.generateAndFillViewportWithNonInteractiveUsersListContainer({
                        
                        callback: {
                            fn: function() {
                                
                                var args = arguments[0];
                                var nonInteractiveUsersListContainer = 'listContainer' in args ? args.listContainer : false;
                                if (nonInteractiveUsersListContainer) {
                                    
                                    var nonInteractiveList = nonInteractiveUsersListContainer.down('noninteractiveuserslist');
                                    nonInteractiveList = (Ext.isObject(nonInteractiveList) && !Ext.isEmpty(nonInteractiveList)) ? nonInteractiveList : false;
                                    if (nonInteractiveList) {
                                        
                                        nonInteractiveUsersListContainer.setTitle('Your Friends');

                                        var friendsStore = Ext.getStore('FriendsStore');
                                        friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                                        
                                        if (friendsStore) {
                                            
                                            nonInteractiveList.setStore(friendsStore);
                                            
                                            nonInteractiveList.open();
                                            
                                            X.view.plugandplay.LoadingContainer.close();
                                        }
                                    }
                                }
                            },
                            scope: me
                        }
                    });
                },
                scope: me
            }
        });
    },
    //    MESSAGE CONTAINER
    onPhotoMessageInputContainerSubmitButtonTap: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onPhotoMessageInputContainerSubmitButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        //        Trigger display of groups and stories so the user can pick where to post
        return me;
    },
    onPhotoMessageInputContainerCancelButtonTap: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onPhotoMessageInputContainerCancelButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        //        Reset photo message input container – reset photo and message form panel
        return me;
    },
    /*
     *    HELPERS
     */
    //    SIGNUP
    //    
    //    Initiate validation and then actual signup
    doSignup: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doSignup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var formPanel = button.up('coreformpanel');
        if (me.isSignupFormValid(formPanel)) {
            me.xhrSignup(formPanel);
        }

        return me;
    },
    //    Ajax sign up: This assumes that the passed user object is valid
    xhrSignup: function(form) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.xhrSignup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        //        Parse: https://www.parse.com/docs/rest#users-signup
        var parseMetaData = me.getParseMetaData({
            typeOfRequest: 'signup'
        }),
                shouldMakeRequest = parseMetaData.shouldMakeRequest;

        if (Ext.isBoolean(shouldMakeRequest) && shouldMakeRequest) {
            var url = parseMetaData.url,
                    method = parseMetaData.method,
                    headers = parseMetaData.headers;

            //            Don't use formpanel's submit method – it always url encodes the params, and
            //            Parse expects json encoded params
            
            var formValues = form.getValues();
            
            var params = formValues;
            
            Ext.Ajax.request({
                url: url,
                method: method,
                headers: headers,
                jsonData: params,
                success: function(serverResponse) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.Users.xhrSignup(): Successful. Received serverResponse:');
                        console.log(serverResponse);
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }

                    var signedUpUser = Ext.decode(serverResponse.responseText);
                    signedUpUser = (Ext.isObject(signedUpUser) && !Ext.isEmpty(signedUpUser)) ? signedUpUser : false;
                    if (signedUpUser) {
                        
                        //                            username and phoneNumber is not sent by Parse, so grab it from form values
                        signedUpUser.username = params.username;
                        signedUpUser.phoneNumber = params.phoneNumber

                        var hasLoggedIn = false;
                        hasLoggedIn = me.logUserIn({
                            user: signedUpUser
                        });
                        
                        if (hasLoggedIn) {
                            
                            me.generateUserSuccessfullyCreatedWindow({
                                message: false,
                                fn: function() {

                                    me.getSignupAndLoginContainer().
                                            close();
                                    //                            This redirect will automatically load the authenticated user store
                                    //                            which is when we get the full authenticated user with all her
                                    //                            associated groups from Parse
                                    me.redirectTo(X.config.Config.getDEFAULT_USER_PAGE());
                                },
                                scope: me
                            });
                        }
                    }
                },
                failure: function(serverResponse) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.Users.xhrSignup(): Failed. Received serverResponse:');
                        console.log(serverResponse);
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }

                    //                    TEMPLATE: Use this as a template to extract information from Parse's response
                    //                    var operationStatus = serverResponse.status,
                    //                            operationStatusText = serverResponse.statusText;
                    //
                    var serverResponseText = Ext.decode(serverResponse.responseText),
                            serverResponseCode = serverResponseText.code,
                            serverResponseError = serverResponseText.error;

                    me.generateFailedAuthenticationWindow({
                        message: serverResponseError
                    });
                }
            });
        }
        else {
            me.generateFailedAuthenticationWindow({
                message: parseMetaData.message
            });
        }

        return me;
    },
    //    Utility: Validate sign up form
    isSignupFormValid: function(formPanel) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.isSignupFormValid(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        formPanel = Ext.isObject(formPanel) ? formPanel : me.getUserSignupFormPanel();

        if (Ext.isObject(formPanel)) {
            var formData = formPanel.getValues();

            var errors = Ext.create('X.model.validation.UserLogin', {
                username: formData.username,
                password: formData.password,
                phoneNumber: formData.phoneNumber
            }).
                    validate();

            if (!errors.isValid()) {
                me.generateInvalidAuthenticationWindow({
                    message: errors.getAt(0).
                            getMessage()
                });

                return false;
            }
        }

        return true;
    },
    //    LOGIN
    //    
    //    Initiate validation and then actual login
    doLogin: function(button, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doLogin(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var formPanel = button.up('coreformpanel');
        if (me.isLoginFormValid(formPanel)) {
            me.xhrLogin(formPanel);
        }

        return me;
    },
    //    Ajax login: This assumes that the passed user object is valid
    xhrLogin: function(form) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.xhrLogin(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        X.view.plugandplay.LoadingContainer.open(X.config.Config.getMESSAGES().LOADING.USER_LOGGING_IN);

        //        Parse: https://www.parse.com/docs/rest#users-login
        var parseMetaData = me.getParseMetaData({
            typeOfRequest: 'login'
        }),
                shouldMakeRequest = parseMetaData.shouldMakeRequest;

        if (Ext.isBoolean(shouldMakeRequest) && shouldMakeRequest) {
            var url = parseMetaData.url,
                    method = parseMetaData.method,
                    headers = parseMetaData.headers;

            //            Don't use formpanel's submit method – it always url encodes the params, and
            //            Parse expects json encoded params
            
            var formValues = form.getValues();
            
            var params = formValues;

            Ext.Ajax.request({
                url: url,
                method: method,
                headers: headers,
                params: params,
                success: function(serverResponse) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.Users.xhrLogin(): Successful. Received serverResponse:');
                        console.log(serverResponse);
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    
                    X.view.plugandplay.LoadingContainer.close();

                    var loggedInUser = Ext.decode(serverResponse.responseText);
                    loggedInUser = (Ext.isObject(loggedInUser) && !Ext.isEmpty(loggedInUser)) ? loggedInUser : false;
                    if (loggedInUser) {

                        var hasLoggedIn = false;
                        hasLoggedIn = me.logUserIn({
                            user: loggedInUser
                        });

                        if (hasLoggedIn) {
                            me.getSignupAndLoginContainer().
                                    close();
                            //                            This redirect will automatically load the authenticated user store
                            //                            which is when we get the full authenticated user with all her
                            //                            associated groups from Parse
                            me.redirectTo(X.config.Config.getDEFAULT_USER_PAGE());
                        }
                    }
                },
                failure: function(serverResponse) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.Users.xhrLogin(): Failed. Received serverResponse:');
                        console.log(serverResponse);
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    
                    X.view.plugandplay.LoadingContainer.close();

                    //                    TEMPLATE: Use this as a template to extract information from Parse's response
                    //                    var operationStatus = serverResponse.status,
                    //                            operationStatusText = serverResponse.statusText;
                    //
                    var serverResponseText = Ext.decode(serverResponse.responseText),
                            serverResponseCode = serverResponseText.code,
                            serverResponseError = serverResponseText.error;

                    me.generateFailedAuthenticationWindow({
                        message: serverResponseError
                    });
                }
            });
        }
        else {
            me.generateFailedAuthenticationWindow({
                message: parseMetaData.message
            });
        }

        return me;
    },
    //    Utility: Validate login form
    isLoginFormValid: function(formPanel) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.isLoginFormValid(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        formPanel = Ext.isObject(formPanel) ? formPanel : me.getUserLoginFormPanel();

        if (Ext.isObject(formPanel)) {
            var formData = formPanel.getValues();

            var errors = Ext.create('X.model.validation.UserLogin', {
                username: formData.username,
                password: formData.password,
                phoneNumber: formData.phoneNumber
            }).
                    validate();

            if (!errors.isValid()) {
                me.generateInvalidAuthenticationWindow({
                    message: errors.getAt(0).
                            getMessage()
                });

                return false;
            }
        }

        return true;
    },
    //    
    //    METHODS TO BE SORTED OUT
    // 
    doAddFriend: function(button, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doAddFriend()');
        }
        var formPanel = button.up('coreformpanel');
        me.xhrAddFriend(formPanel);
    },
    xhrAddFriend: function(form) {
        var me = this;
        form.submit({
            url: '/friendships',
            method: 'POST',
            success: function(form, action, serverResponse) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Users.xhrAddFriend(): Successful');
                }
                form.reset();
                me.generateFriendshipSuccessfullyCreatedWindow({
                    message: "Successfully friended this user!"
                });
            },
            failure: function(form, serverResponse) {
                form.reset();
                var serverResponseMessage = (Ext.isObject(serverResponse) && Ext.isString(serverResponse.message)) ? serverResponse.message : false;
                me.generateFailedWindow({
                    message: serverResponseMessage
                });
            }
        });
    },
    show: function(id) {
        var me = this;
        if (X.XConfig.getDEBUG()) {
            console.log('Debug: X.controller.Users.show(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me;
    },
    authenticate: function(action) {
        var me = this;
        if (X.XConfig.getDEBUG()) {
            console.log('Debug: X.controller.Users.authenticate(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        action.resume();
    },
    //    UPDATE
    //    
    //    Updates authenticated user by calling me.saveAuthenticatedUser()
    doUpdateAuthenticatedUser: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doUpdateAuthenticatedUser(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.saveAuthenticatedUser(options);
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Users.init()");
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Users.launch()");
        }
    }
});
