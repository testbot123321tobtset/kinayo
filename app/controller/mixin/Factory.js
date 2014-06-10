Ext.define('X.controller.mixin.Factory', {
    generateComponentsOnViewportPainted: function() {
        var me = this;
        //        We haven\'t figured out eager generaton yet, but here is the hook
        //        me.generateEagerComponents();
        me.generateCameraTriggerPanel();
        return me;
    },
    generateEagerComponents: function() {
        var me = this;
        var xTypesOfComponentsToBeEagerGenerated = X.config.Config.getEAGERGENERATECOMPONENTS();
        Ext.Array.each(xTypesOfComponentsToBeEagerGenerated, function(thisXtype) {
            me.createView({
                xtype: thisXtype,
                hidden: true
            }).
                    hide();
        });
        return me;
    },
    generateFriendshipSuccessfullyCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().FRIENDSHIP_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupSuccessfullyCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupFailedCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_FAILED_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupSuccessfullyUpdatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_UPDATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupSuccessfullyDestroyedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_DESTROYED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyLoggedInWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_LOGGED_IN;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyUpdatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_UPDATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyDestroyedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_DESTROYED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserFailedUpdatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_FAILED_UPDATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateFailedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : 'Hmm, that failed for some reason. Let us know, and we\'ll take care of it.';
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateFailedAuthenticationWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().FAILED_AUTHENTICATION;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateInvalidAuthenticationWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().INVALID_LOGIN;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateFailedSaveModelWindow: function(callback) {
        var me = this;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, X.XConfig.getMESSAGES().FAILED_SAVE, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateCameraTriggerPanel: function() {
        var me = this;
        var cameraTriggerPanel = Ext.Viewport.add(me.createView({
            xtype: 'cameratriggerpanel'
        }));
        cameraTriggerPanel.show();
    },
    generateUserDeviceContactsAccessRequestWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserDeviceContactsAccessRequestWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        Ext.Msg.confirm(X.XConfig.getMESSAGES().CONFIRM, X.XConfig.getMESSAGES().DEVICE_CONTACTS_ACCESS_REQUEST, function(buttonId) {
            if (buttonId === 'yes') {
                Ext.Viewport.fireEvent('devicecontactsstorerefreshuserrequest');
            }
        });
        return me;
    },
    destroyAllAuthenticatedComponents: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: destroyAllAuthenticatedComponents(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var pageUserRoot = Ext.isObject(me.getPageUserRoot()) ? me.getPageUserRoot() : false;
        if (pageUserRoot) {
            pageUserRoot.close();
        }

        return me;
    },
    //    Signup
    generateAndFillViewportWithUserSignupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserSignupWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var signupAndLoginContainer = Ext.isObject(me.getSignupAndLoginContainer()) ? me.getSignupAndLoginContainer() : Ext.Viewport.add(me.createView({
            xtype: 'signupandlogincontainer'
        }));
        signupAndLoginContainer.down('#signupAndLoginTabPanel').
                setActiveItem('#userSignup');
        signupAndLoginContainer.setDimensions().
                open();

        return signupAndLoginContainer;
    },
    //    Login
    generateAndFillViewportWithUserLoginWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserLoginWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var signupAndLoginContainer = Ext.isObject(me.getSignupAndLoginContainer()) ? me.getSignupAndLoginContainer() : Ext.Viewport.add(me.createView({
            xtype: 'signupandlogincontainer'
        }));
        signupAndLoginContainer.down('#signupAndLoginTabPanel').
                setActiveItem('#userLogin');
        signupAndLoginContainer.setDimensions().
                open();

        return signupAndLoginContainer;
    },
    clearViewportAndGenerateUserRootPageTabPanel: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: clearViewportAndGenerateUserRootPageTabPanel(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var pageUserRoot = (Ext.isObject(me.getPageUserRoot()) && !Ext.isEmpty(me.getPageUserRoot())) ? me.getPageUserRoot() : false;
        if (!pageUserRoot) {
            pageUserRoot = me.createView({
                xtype: 'pageuserroot'
            });
        }
        if (Ext.isObject(pageUserRoot) && !Ext.isEmpty(pageUserRoot)) {
            Ext.Viewport.removeAll(false, false).
                    add(pageUserRoot).
                    open();
        }

        return me;
    },
    // User
    generateUserRootPageTabPanel: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserRootPageTabPanel(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var pageUserRoot = Ext.isObject(me.getPageUserRoot()) ? me.getPageUserRoot() : Ext.Viewport.removeAll(false, false).
                add(me.createView({
                    xtype: 'pageuserroot'
                }));

        return pageUserRoot.open();
    },
    // User :: More
    generateUserRootPageTabPanelAndActivateUserMoreTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserRootPageTabPanelAndActivateUserMoreTab(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var pageUserRoot = me.generateUserRootPageTabPanel();
        pageUserRoot.setActiveItem('#userMore');

        return pageUserRoot;
    },
    // User :: More :: Account
    generateUserMoreTabPanelAndActivateUserAccountTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserMoreTabPanelAndActivateUserAccountTab(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var userMoreTabPanel = me.generateUserRootPageTabPanelAndActivateUserMoreTab().
                down('#userMoreTabPanel');
        userMoreTabPanel.
                setActiveItem('#userAccount');

        return userMoreTabPanel;
    },
    // User :: Groups
    generateUserRootPageTabPanelAndActivateUserGroupsTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserRootPageTabPanelAndActivateUserGroupsTab(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var pageUserRoot = me.generateUserRootPageTabPanel();
        pageUserRoot.setActiveItem('#userGroups');

        return pageUserRoot;
    },
    // User :: Groups :: Feeds
    generateUserGroupsTabPanelAndActivateUserGroupFeedsTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserGroupsTabPanelAndActivateUserGroupFeedsTab(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var userGroupsTabPanel = me.generateUserRootPageTabPanelAndActivateUserGroupsTab().
                down('#userGroupsTabPanel');
        userGroupsTabPanel.
                setActiveItem('#userGroupFeeds');

        return userGroupsTabPanel;
    },
    // User :: Groups :: Feed :: Data window
    generateAndFillViewportWithGroupDataWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithGroupDataWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        options = Ext.isObject(options) ? options : false;
        if (options) {
            var group = ('group' in options && Ext.isObject(options.group)) ? options.group : false;
            var userGroupContainer = Ext.isObject(me.getUserGroupContainer()) ? me.getUserGroupContainer() : Ext.Viewport.add(me.createView({
                xtype: 'usergroupcontainer'
            }));
            userGroupContainer.setDimensions().
                    open().
                    setRecordRecursive(group);

            return userGroupContainer;
        }

        return false;
    },
    // User :: Groups :: Feed edit
    generateAndFillViewportWithEditGroupWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithEditGroupWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        options = Ext.isObject(options) ? options : false;
        if (options) {
            var group = ('group' in options && Ext.isObject(options.group)) ? options.group : false;
            var isGroupCreatedByMe = group.isCreatedByMe();
            
            var userGroupEditContainer = Ext.isObject(me.getUserGroupEditContainer()) ? me.getUserGroupEditContainer() : Ext.Viewport.add(me.createView({
                xtype: 'usergroupeditcontainer'
            }));
            userGroupEditContainer.setDimensions().
                    open().
                    setRecord(group);

            var userGroupEditFormPanel = userGroupEditContainer.down('#userGroupEditFormPanel');
            userGroupEditFormPanel = (Ext.isObject(userGroupEditFormPanel) && !Ext.isEmpty(userGroupEditFormPanel)) ? userGroupEditFormPanel : false;
            if (userGroupEditFormPanel) {
                
                userGroupEditFormPanel.setRecord(group);
                
                var usersList = false;
                var membersStore = false;
                if(isGroupCreatedByMe) {
                    
                    usersList = userGroupEditFormPanel.down('interactiveuserslist');
                    
                    var membersStore = usersList.getStore();
                    membersStore = Ext.isObject(membersStore) ? membersStore : false;
                    if(!membersStore) {
                    
                        membersStore = Ext.getStore('FriendsStore');
                        membersStore = Ext.isObject(membersStore) ? membersStore : false;
                        if(membersStore) {
                            
                            usersList.setStore(membersStore);
                        }
                    }
                    
                    usersList.deselectAll();
                    
                    usersList.select(group.getMembers(), false, true);
                    
                    usersList.open();
                }
                else {
                    
                    userGroupEditContainer.setReadOnly();
                    
                    usersList = userGroupEditFormPanel.down('noninteractiveuserslist');
                    
                    membersStore = Ext.getStore('FriendsStore');
                    //                    Show only members of this group
                    
                    usersList.open();
                }
            }

            return userGroupEditContainer;
        }

        return me;
    },
    // User :: Groups :: Create
    generateUserGroupsTabPanelAndActivateUserAddGroupTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserGroupsTabPanelAndActivateUserAddGroupTab()');
        }

        var userGroupsTabPanel = me.generateUserRootPageTabPanelAndActivateUserGroupsTab().
                down('#userGroupsTabPanel');
        userGroupsTabPanel.
                setActiveItem('#userAddGroups');

        var userGroupAddFormPanel = userGroupsTabPanel.down('#userGroupAddFormPanel');
        userGroupAddFormPanel = (Ext.isObject(userGroupAddFormPanel) && !Ext.isEmpty(userGroupAddFormPanel)) ? userGroupAddFormPanel : false;
        if (userGroupAddFormPanel) {
            
            userGroupAddFormPanel.removeRecord();

            var usersList = userGroupAddFormPanel.down('interactiveuserslist');
            usersList = (Ext.isObject(usersList) && !Ext.isEmpty(usersList)) ? usersList : false;
            if (usersList) {

                var friendsStore = Ext.getStore('FriendsStore');
                friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                if (friendsStore) {

                    usersList.setStore(friendsStore);
                    
                    usersList.open();
                }
            }
        }

        return userGroupsTabPanel;
    },
    // Camera :: Photo message input
    generateAndFillViewportWithPhotoMessageInputContainerWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithPhotoMessageInputContainerWindow()');
        }

        var photoMessageInputContainer = false;
        var photoMessageInputContainerExists = Ext.isObject(me.getPhotoMessageInputContainer());
        if (photoMessageInputContainerExists) {
            photoMessageInputContainer = me.getPhotoMessageInputContainer();
            photoMessageInputContainer.open();
        }
        else {
            photoMessageInputContainer = Ext.Viewport.add(me.createView({
                xtype: 'photomessageinputcontainer'
            }));
            photoMessageInputContainer.open();
            photoMessageInputContainerExists = true;
        }
        if (photoMessageInputContainerExists) {
            var options = Ext.isObject(options) ? options : false;
            if (options) {
                var imageData = ('imageData' in options) ? options.imageData : false;
                if (imageData) {
                    var destinationType = X.config.Config.getPG_CAMERA().DESTINATION_TYPE;
                    if (destinationType === 1 || destinationType === 2) {
                        photoMessageInputContainer.setImageUsingFileUrl(imageData);
                    }
                    else if (destinationType === 0) {
                        photoMessageInputContainer.setImageUsingBase64Data(imageData);
                    }
                }
            }
        }

        return me;
    },
    /*
     * Interactive and noninteractive users lists
     */




    //    setDeviceContactsStoreAndGenerateAndFillViewportWithNonInteractiveUsersListContainer: function(options) {
    //        var me = this;
    //        if (me.getDebug()) {
    //            console.log('Debug: X.controller.mixin.Factory: setDeviceContactsStoreAndGenerateAndFillViewportWithNonInteractiveUsersListContainer()');
    //        }
    //        
    //        var successCallback = false,
    //                failureCallback = false;
    //        
    //        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
    //        if(options) {
    //            
    //            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
    //            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
    //        }
    //        
    //        var listContainer = 'nonInteractiveUsersListContainer' in X ? X.nonInteractiveUsersListContainer : false;
    //        if(listContainer) {
    //            
    //            listContainer = (Ext.isObject(listContainer) && !Ext.isEmpty(listContainer)) ? listContainer : false;
    //        }
    //        
    //        if(!listContainer) {
    //            
    //            listContainer = Ext.Viewport.add(me.createView({
    //                xtype: 'noninteractiveuserslistcontainer'
    //            }));
    //            listContainer = (Ext.isObject(listContainer) && !Ext.isEmpty(listContainer)) ? listContainer : false;
    //        }
    //        
    //        if(listContainer) {
    //            
    //            X.view.plugandplay.LoadingContainer.open();
    //            
    //            listContainer.down('list').hide();
    //            listContainer.setDimensions().
    //                    open();
    //            
    //            Ext.Function.defer(function() {
    //                var deviceContactStore = Ext.getStore('DeviceContactStore');
    //                if (Ext.isObject(deviceContactStore)) {
    //                    
    //                    me.setDeviceContactsStore({
    //                        successCallback: {
    //                            fn: function() {
    //                                listContainer.down('list').
    //                                        setStore(deviceContactStore);
    //                                listContainer.down('list').show();
    //
    //                                X.view.plugandplay.LoadingContainer.close();
    //                            },
    //                            scope: me
    //                        }
    //                    });
    //                }
    //            }, 100);
    //            
    //            return listContainer;
    //        }
    //        
    //        return false;
    //    },
    //    generateAndFillViewportWithNonInteractiveUsersListContainer: function(options) {
    //        var me = this;
    //        if (me.getDebug()) {
    //            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithNonInteractiveUsersListContainer()');
    //        }
    //
    //        var successCallback = false,
    //                failureCallback = false;
    //        
    //        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
    //        if(options) {
    //            
    //            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
    //            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
    //        }
    //        
    //        var listContainer = 'nonInteractiveUsersListContainer' in X ? X.nonInteractiveUsersListContainer : false;
    //        if(listContainer) {
    //            
    //            listContainer = (Ext.isObject(listContainer) && !Ext.isEmpty(listContainer)) ? listContainer : false;
    //        }
    //        
    //        if(!listContainer) {
    //            
    //            listContainer = Ext.Viewport.add(me.createView({
    //                xtype: 'noninteractiveuserslistcontainer'
    //            }));
    //            listContainer = (Ext.isObject(listContainer) && !Ext.isEmpty(listContainer)) ? listContainer : false;
    //        }
    //        
    //        if(listContainer) {
    //            listContainer.setDimensions().
    //                    open();
    //            Ext.Function.defer(function() {
    //                var deviceContactStore = Ext.getStore('DeviceContactStore');
    //                if (Ext.isObject(deviceContactStore)) {
    //
    //                    listContainer.down('list').
    //                            setStore(deviceContactStore);
    //                }
    //            }, 100);
    //            
    //
    //            return listContainer;
    //        }
    //        
    //        return false;
    //    },
    generateAndFillViewportWithInteractiveUsersListContainer: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithInteractiveUsersListContainer()');
        }

        var callback = false;

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {

            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
        }

        var listContainer = X.view.plugandplay.InteractiveUsersListContainer;

        listContainer = (Ext.isObject(listContainer) && !Ext.isEmpty(listContainer)) ? listContainer : false;
        if (listContainer) {

            listContainer.setDimensions().
                    open();

            if (callback) {

                callback.arguments = {
                    listContainer: listContainer
                };

                me.executeCallback(callback);
            }

            return listContainer;
        }

        return false;
    }
});