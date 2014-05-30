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
//    Signup
    generateAndFillViewportWithUserSignupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserSignupWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageLogin())) {
            var loginPage = Ext.Viewport.removeAll(false, false).
                    add(me.createView({
                        xtype: 'pagelogin'
                    }));
            loginPage.setDimensionsToFillScreen().
                    show(X.config.Config.getSHOW_ANIMATION_CONFIG());
            loginPage.setActiveItem('#userSignup');
        }
        else {
            if (me.getPageLogin().
                    isHidden()) {
                Ext.Viewport.removeAll(false, false).
                        add(me.getPageLogin());
                me.getPageLogin().
                        setDimensionsToFillScreen().
                        show(X.config.Config.getSHOW_ANIMATION_CONFIG());
                me.getPageLogin().
                        setActiveItem('#userSignup');
            }
            else {
                me.getPageLogin().
                        setActiveItem('#userSignup');
            }
        }
        return me;
    },
//    Login
    generateAndFillViewportWithUserLoginWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserLoginWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageLogin())) {
            var loginPage = Ext.Viewport.removeAll(false, false).
                    add(me.createView({
                        xtype: 'pagelogin'
                    }));
            loginPage.setDimensionsToFillScreen().
                    show(X.config.Config.getSHOW_ANIMATION_CONFIG());
            loginPage.setActiveItem('#userLogin');
        }
        else {
            if (me.getPageLogin().
                    isHidden()) {
                Ext.Viewport.removeAll(false, false).
                        add(me.getPageLogin());
                me.getPageLogin().
                        setDimensionsToFillScreen().
                        show(X.config.Config.getSHOW_ANIMATION_CONFIG());
                me.getPageLogin().
                        setActiveItem('#userLogin');
            }
            else {
                me.getPageLogin().
                        setActiveItem('#userLogin');
            }
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
            var userEditGroupContainer = Ext.isObject(me.getUserEditGroupContainer()) ? me.getUserEditGroupContainer() : Ext.Viewport.add(me.createView({
                xtype: 'usereditgroupcontainer'
            }));
            userEditGroupContainer.setDimensions().
                    open().
                    setRecordRecursive(group).
                    setReadOnly(!group.isCreatedByMe());
            
            return userEditGroupContainer;
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
    }
});