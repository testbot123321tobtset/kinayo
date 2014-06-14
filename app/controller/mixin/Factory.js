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
        cameraTriggerPanel.open();
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
                    add(pageUserRoot);
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

        return pageUserRoot;
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
            if (userGroupEditContainer) {

                userGroupEditContainer.setRecord(group);
                userGroupEditContainer.setTitleToGroupTitle();

                Ext.Function.defer(function() {

                    userGroupEditContainer.openFullScreen();

                    var userGroupEditFormPanel = userGroupEditContainer.down('#userGroupEditFormPanel');
                    userGroupEditFormPanel = (Ext.isObject(userGroupEditFormPanel) && !Ext.isEmpty(userGroupEditFormPanel)) ? userGroupEditFormPanel : false;
                    if (userGroupEditFormPanel) {

                        var existingUsersList = userGroupEditFormPanel.down('list');
                        existingUsersList = (Ext.isObject(existingUsersList) && !Ext.isEmpty(existingUsersList)) ? existingUsersList : false;

                        var indexOfExistingUsersList = false;
                        if (existingUsersList) {

                            indexOfExistingUsersList = userGroupEditFormPanel.getItems().
                                    indexOf(existingUsersList);
                        }

                        var existingUsersListXtype = false;
                        if (existingUsersList) {

                            existingUsersListXtype = existingUsersList.getLastXType();
                            existingUsersListXtype = (Ext.isString(existingUsersListXtype) && !Ext.isEmpty(existingUsersListXtype)) ? existingUsersListXtype : false;
                        }

                        var indexAtWhichUsersListMustBeInserted = userGroupEditFormPanel.getIndexAtWhichListShouldBeInserted();
                        indexAtWhichUsersListMustBeInserted = Ext.isNumber(indexAtWhichUsersListMustBeInserted) ? indexAtWhichUsersListMustBeInserted : false;

                        userGroupEditFormPanel.setRecord(group);
                        
                        userGroupEditContainer.setReadOnly(!isGroupCreatedByMe);

                        var usersList = false;
                        var membersStore = false;
                        if (isGroupCreatedByMe) {

                            if (existingUsersListXtype === 'interactiveuserslist') {

                                usersList = existingUsersList;
                            }
                            else {

                                usersList = Ext.create('X.view.plugandplay.InteractiveUsersList', {
                                    flex: 1
                                });

                                if (indexAtWhichUsersListMustBeInserted) {

                                    if (indexOfExistingUsersList) {

                                        userGroupEditFormPanel.removeAt(indexOfExistingUsersList);
                                    }

                                    userGroupEditFormPanel.insert(indexAtWhichUsersListMustBeInserted, usersList);
                                }
                            }

                            membersStore = usersList.getStore();
                            membersStore = Ext.isObject(membersStore) ? membersStore : false;
                            if (!membersStore) {

                                membersStore = Ext.getStore('FriendsStore');
                                membersStore = Ext.isObject(membersStore) ? membersStore : false;
                                if (membersStore) {

                                    usersList.setStore(membersStore);
                                }
                            }

                            usersList.deselectAll(true);

                            usersList.select(group.getMembers(), false, true);
                        }
                        else {
                            
                            if (existingUsersListXtype === 'noninteractiveuserslist') {

                                usersList = existingUsersList;
                            }
                            else {

                                usersList = Ext.create('X.view.plugandplay.NonInteractiveUsersList', {
                                    flex: 1
                                });

                                if (indexAtWhichUsersListMustBeInserted) {

                                    if (indexOfExistingUsersList) {

                                        userGroupEditFormPanel.removeAt(indexOfExistingUsersList);
                                    }

                                    userGroupEditFormPanel.insert(indexAtWhichUsersListMustBeInserted, usersList);
                                }
                            }

                            //                    Show only members of this group   
                            //                    For now just show the whole friends list
                            membersStore = Ext.getStore('FriendsStore');
                            membersStore = Ext.isObject(membersStore) ? membersStore : false;
                            if (membersStore) {

                                usersList.setStore(membersStore);
                            }

                            usersList.deselectAll(true);
                        }
                    }
                }, 50);
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
                
                userGroupAddFormPanel.closeList();
                
                var friendsStore = Ext.getStore('FriendsStore');
                friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                if (friendsStore) {

                    usersList.setStore(friendsStore);
                    
                    usersList.
                            deselectAll(true);
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
    },
    generateAndFillViewportWithNonInteractiveUsersListContainer: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithNonInteractiveUsersListContainer()');
        }

        var callback = false;

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {

            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
        }

        var listContainer = X.view.plugandplay.NonInteractiveUsersListContainer;

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