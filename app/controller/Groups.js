Ext.define('X.controller.Groups', {
    extend: 'X.controller.Main',
    requires: [
        'X.view.plugandplay.UserGroupContainer',
        'X.view.plugandplay.UserEditGroupContainer',
        'X.view.plugandplay.UsersList'
    ],
    config: {
        models: [
            'Group',
            'User',
            'AuthenticatedUser'
        ],
        stores: [
            'Groups',
            'Users',
            'AuthenticatedUser'
        ],
        before: {
            showGroupsList: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showFeedUiForGivenGroupId: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showEditGroupUiForGivenGroupId: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showCreate: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ]
        },
        routes: {
            'user/profile/groups/feeds': 'showGroupsList',
            'user/profile/groups/feeds/:id': 'showFeedUiForGivenGroupId',
            'user/profile/groups/feeds/:id/edit': 'showEditGroupUiForGivenGroupId',
            'user/profile/groups/create': 'showCreate'
        },
        control: {
            viewport: {
                editgroup: 'onEditGroup',
                editgroupvalidationfailed: 'onEditGroupValidationFailed',
                destroygroupmessageshow: 'onDestroyGroupMessageShow',
                destroygroup: 'onDestroyGroup',
                destroyedgroup: 'onDestroyedGroup',
//                WebSockets
//                xsocketconnection: 'onXSocketConnection'
                xsocketupdategroup: 'onXSocketUpdateGroup',
                xsocketdeletegroup: 'onXSocketDeleteGroup'
            },
            // User :: Groups
            userGroupsTabPanel: {
                activeitemchange: 'onUserGroupsTabPanelPanelActiveItemChange'
            },
            // User :: Groups :: Feeds
            userGroupsList: {
                itemtap: 'onUserGroupsListItemTap'
            },
            // This is actually the Edit button for now
            // Maybe in future we might need more features here
            // User :: Groups :: Feed data,
            userGroupContainerMoreButton: {
                tap: 'onUserGroupContainerMoreButtonTap'
            },
            userGroupContainer: {
//                swipedown: 'onUserGroupContainerSwipeDown',
//                beforehide: 'onUserGroupContainerBeforeHide',
//                hide: 'onUserGroupContainerHide'
            },
            userGroupContainerBackButton: {
                tap: 'onUserGroupContainerBackButtonTap'
            },
            // User :: Groups :: Group edit
            userEditGroupContainer: {
//                swipedown: 'onUserEditGroupContainerSwipeDown',
//                hide: 'onUserEditGroupContainerHide'
            },
            userEditGroupContainerBackButton: {
                tap: 'onUserEditGroupContainerBackButtonTap'
            },
            // User :: Groups :: Create
            userGroupCreateSubmitButton: {
                tap: 'doCreateGroup'
            }
        },
        refs: {
            // User profile root page - this comes after authentication
            pageUserRoot: '#pageUserRoot',
            // User :: Groups
            userGroupsTabPanel: '#userGroupsTabPanel',
            // User :: Groups :: Feeds
            userGroupFeeds: '#userGroupsTabPanel #userGroupFeeds',
            userGroupsList: '#userGroupsTabPanel #userGroupFeeds #userGroupsList',
            // User :: Groups :: Feed data
            userGroupContainer: '#userGroupContainer',
            userGroupContainerTopToolbar: '#userGroupContainer #userGroupContainerToolbar',
            userGroupContainerStoriesButton: '#userGroupContainer #userGroupContainerToolbar #storiesButton',
            userGroupContainerMoreButton: '#userGroupContainer #userGroupContainerToolbar #moreButton',
            userGroupContainerBackButton: '#userGroupContainer #userGroupContainerToolbar #backButton',
            // User :: Groups :: Group edit
            userEditGroupContainer: '#userEditGroupContainer',
            userEditGroupContainerTopToolbar: '#userEditGroupContainer #userEditGroupContainerToolbar',
            userEditGroupContainerBackButton: '#userEditGroupContainer #userEditGroupContainerToolbar #backButton',
            userGroupEditFormPanel: '#userGroupEditFormPanel',
            userGroupEditFormPanelUsersListContainer: '#userGroupEditFormPanel #usersListContainer',
            userGroupEditFormPanelUsersList: '#userGroupEditFormPanel #usersListContainer #usersList',
            // User :: Groups :: Create
            userGroupAddFormPanel: '#userGroupAddFormPanel',
            userGroupCreateSubmitButton: '#userGroupAddFormPanel #submitButton'
        }
    },
//    onOrientationchange: function(viewport, newOrientation, width, height, eOpts) {
//        var me = this;
//        var windows = [
//            me.getUserGroupContainer(),
//            me.getUserEditGroupContainer()
//        ];
//        Ext.each(windows, function(thisWindow) {
//            if(Ext.isObject(thisWindow)) {
//                thisWindow.setWidth(width);
//                thisWindow.setHeight(height);
//            }
//        });
//        return me;
//    },
    // UI EVENT HANDLERS
    onUserGroupsTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        if (Ext.isObject(tabPanel) && Ext.isObject(activeItem)) {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.onUserGroupsTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            var urlHash = me.getUrlHash();
            if (activeItem.getItemId() === 'userGroupFeeds' && urlHash !== 'user/profile/groups/feeds') {
                me.redirectTo('user/profile/groups/feeds');
            }
            else if (activeItem.getItemId() === 'userAddGroups' && urlHash !== 'user/profile/groups/create') {
                me.redirectTo('user/profile/groups/create');
            }
        }
        return me;
    },
    onUserGroupsListItemTap: function(list, index, target, record, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupsListItemTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo('user/profile/groups/feeds/' + record.getId());
    },
    onUserGroupContainerMoreButtonTap: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupContainerMoreButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo(me.getUrlHash() + '/edit');
        return me;
    },
    onUserGroupContainerBackButtonTap: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupContainerHide(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.getUserGroupsList().
                deselectAll();
        me.redirectTo('user/profile/groups/feeds');
        return me;
    },
    onUserGroupContainerSwipeDown: function(userGroupContainer, event) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupContainerSwipeDown(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.getUserGroupsList().
                deselectAll();
        me.redirectTo('user/profile/groups/feeds');
        return me;
    },
    onUserEditGroupContainerBackButtonTap: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserEditGroupContainerBackButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo('user/profile/groups/feeds/' + button.up('#userEditGroupContainer').
                getRecord().
                getId());
        return me;
    },
    onUserEditGroupContainerHide: function(userEditGroupContainer, event) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserEditGroupContainerHide(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        userEditGroupContainer.down('#usersListContainer').removeAll(true, true);
        return me;
    },
    onUserEditGroupContainerSwipeDown: function(userEditGroupContainer, event) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserEditGroupContainerSwipeDown(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo('user/profile/groups/feeds/' + userEditGroupContainer.
                getRecord().
                getId());
        return me;
    },
    onDestroyGroupMessageShow: function(options) {
        var me = this;
        if(Ext.isObject(options) && !Ext.isEmpty(options) && 'containerToBeBlurred' in options && Ext.isObject(options.containerToBeBlurred)) {
//            me.createOptimizedLayeredEffect(options.containerToBeBlurred);
            options.containerToBeBlurred.createOptimizedLayeredEffect();
        }
        return me;
    },
    // OTHER EVENT HANDLERS
    onEditGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onEditGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.doUpdateGroup(options);
    },
    onEditGroupValidationFailed: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onEditGroupValidationFailed(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateUserFailedUpdatedWindow({
            message: options.errors.getAt(0).
                    getMessage()
        });
        return me;
    },
    onDestroyGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onDestroyGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.doDestroyGroup(options);
    },
    onDestroyedGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onDestroyedGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me;
    },
//    WEBSOCKET EVENT HANDLERS
    onXSocketConnection: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onXSocketConnection(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        return me;
    },
    onXSocketUpdateGroup: function(data) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onXSocketUpdateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
//        var groupsStore = Ext.getStore('GroupsStore');
//        groupsStore.
//                waitWhileLoadingAndCallbackOnLoad({
//                    fn: function() {
//                        me.loadGroupsStore();
//                    }
//                });
        if(Ext.isObject(data) && 'groupId' in data && Ext.isString(data.groupId)) {
            X.model.Group.load(data.groupId, {
                success: function(record, operation) {
                    me.updateViewsBoundToGivenRecord({
                        modelName: 'Group',
                        record: record,
                        store: Ext.getStore('GroupsStore')
                    });
                }
            });
        }
        
        return me;
    },
    onXSocketDeleteGroup: function(data) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onXSocketDeleteGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var groupsStore = Ext.getStore('GroupsStore');
        if(Ext.isObject(groupsStore)) {
            groupsStore.
                    waitWhileLoadingAndCallbackOnLoad({
                        fn: function() {
                            me.loadGroupsStore({
                                fn: function() {
//                                    console.log('***********');
//                                    me.updateViewsBoundToGivenRecord({
//                                        store: groupsStore
//                                    });
                                },
                                scope: me
                            });
                        }
                    });
        }
//        if(Ext.isObject(data) && 'groupId' in data && Ext.isString(data.groupId)) {
//            X.model.Group.load(data.groupId, {
//                success: function(record, operation) {
//                    me.updateViewsBoundToGivenRecord({
//                        modelName: 'Group',
//                        record: record,
//                        store: Ext.getStore('GroupsStore')
//                    });
//                }
//            });
//        }
        
        return me;
    },
    // HELPERS
    addGroupsListToGroupsFeedTabWithGivenGroupsStore: function(groupsStore) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.addGroupsListToGroupsFeedTabWithGivenGroupsStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        if (Ext.isObject(groupsStore)) {
            me.getUserGroupsList().
                    setStore(Ext.getStore('GroupsStore'));
        }
        
        return me;
    },
    // User :: Groups :: Feeds
    showGroupsList: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showGroupsList(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore.
                waitWhileLoadingAndCallbackOnLoad({
                    fn: function() {
                        me.generateUserGroupsTabPanelAndActivateUserGroupFeedsTab();
                        me.addGroupsListToGroupsFeedTabWithGivenGroupsStore(groupsStore);
                        me.getPageUserRoot().
                                closeEverythingAboveMe();
                    }
                });

        return me;
    },
    // User :: Groups :: Feed data
    showFeedUiForGivenGroupId: function(groupId) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore.
                waitWhileLoadingAndCallbackOnLoad({
                    fn: function() {
                        // Preload all UIs that go underneath this group feed UI
                        me.generateUserGroupsTabPanelAndActivateUserGroupFeedsTab();
                        me.addGroupsListToGroupsFeedTabWithGivenGroupsStore(groupsStore);
                        // Actually show group feed UI
                        me.generateAndFillViewportWithGroupDataWindow({
                            group: groupsStore.
                                    getById(groupId)
                        }).
                                closeEverythingAboveMe();
                    }
                });

        return me;
    },
    // User :: Groups :: Group edit
    showEditGroupUiForGivenGroupId: function(groupId) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showEditFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore.
                waitWhileLoadingAndCallbackOnLoad({
                    fn: function() {
                        // Preload all UIs that go underneath this edit group UI
                        me.generateUserGroupsTabPanelAndActivateUserGroupFeedsTab();
                        me.addGroupsListToGroupsFeedTabWithGivenGroupsStore(groupsStore);
                        var group = groupsStore.
                                getById(groupId);
                        me.generateAndFillViewportWithGroupDataWindow({
                            group: group
                        });
                        // Actually show edit group UI
                        if (me.generateAndFillViewportWithEditGroupWindow({
                            group: group,
                            showcontainer: true
                        })) {
//                            Retrieve all of the friends of the authenticated user
//                            and display them here in a list
//                            me.resetUserGroupEditFormPanelWithFriendsCheckboxes();
//                            
//                            For now, we show contacts list – once we are ready with friends API, 
//                            we'll switch to me.resetUserGroupEditFormPanelWithFriendsCheckboxes();
                            me.setDeviceContactsStoreAndCallback({
                                successCallback: {
                                    fn: function() {
                                        me.resetUserGroupEditFormPanelWithDeviceContactsCheckboxes();
                                    },
                                    scope: me
                                },
                                failureCallback: {
                                    fn: function() {
                                        console.log('failed!');
                                    },
                                    scope: me
                                }
                            });
                        }
                        me.getUserEditGroupContainer().
                                closeEverythingAboveMe();
                    }
                });
        return me;
    },
    resetUserGroupEditFormPanelWithFriendsCheckboxes: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        Ext.getStore('AuthenticatedUserStore').
                waitWhileLoadingAndCallbackOnLoad({
                    fn: function() {
                        var friendsStore = X.authenticatedEntity.friends();
                        var userGroupEditFormPanelUsersListContainer = me.getUserGroupEditFormPanelUsersListContainer();
                        var userGroupEditFormPanelUsersList = me.getUserGroupEditFormPanelUsersList();
                        if (Ext.isObject(userGroupEditFormPanelUsersList)) {
                            userGroupEditFormPanelUsersList.setStore(friendsStore);
                        }
                        else if (Ext.isObject(userGroupEditFormPanelUsersListContainer)) {
                            var userGroupEditFormPanelUsersList = {
                                xtype: 'userslist',
                                store: friendsStore
                            };
                            userGroupEditFormPanelUsersListContainer.
                                    add(userGroupEditFormPanelUsersList);
                        }
                    }
                });
        return me;
    },
    // This assumes that the DeviceContactsStore has the latest contacts
    resetUserGroupEditFormPanelWithDeviceContactsCheckboxes: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.resetUserGroupEditFormPanelWithDeviceContactsCheckboxes(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var deviceContactsStore = Ext.getStore('DeviceContactStore');
        var userGroupEditFormPanelUsersListContainer = me.getUserGroupEditFormPanelUsersListContainer();
        var group = userGroupEditFormPanelUsersListContainer.getRecord();
//        Create this list if:
//        1. existing list is created by you and the new list isn't
//        2. existing list is not created by you and the new list is
//        Baically, create this list every time the creator changes from you to someone else and vice versa.
//        Because there seems to be an issue with setting onItemDisclosure on an already
//        existing list and there might be groups that are not created by the authenticated user, so these groups should
//        be read only to the authenticated user, so we will need to change the list on per group basis. And so since
//        dynamically setting onItemDisclosure does not work, we just recreate the whole list every time the creator changes
//        from the authenticated user to a friend and vice versa
        var isGroupCreatedByMe = group.isCreatedByMe();
        var shouldCreateNewUsersList = false;
        var userGroupEditFormPanelUsersList = me.getUserGroupEditFormPanelUsersList();
        if (!Ext.isObject(userGroupEditFormPanelUsersList)) { 
            shouldCreateNewUsersList = true;
        }
        else if(userGroupEditFormPanelUsersList.getOnItemDisclosure() !== isGroupCreatedByMe) {
            userGroupEditFormPanelUsersListContainer.remove(userGroupEditFormPanelUsersList);
            shouldCreateNewUsersList = true;
        }
        if(shouldCreateNewUsersList) {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.resetUserGroupEditFormPanelWithDeviceContactsCheckboxes(): A new users list will be created: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            userGroupEditFormPanelUsersList = {
                xtype: 'userslist',
                store: deviceContactsStore,
                onItemDisclosure: isGroupCreatedByMe,
                disableSelection: !isGroupCreatedByMe
            };
        }
        else {
            userGroupEditFormPanelUsersList.setStore(deviceContactsStore);
        }
        userGroupEditFormPanelUsersListContainer.
                add(userGroupEditFormPanelUsersList);
        
        return me;
    },
    doUpdateGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doUpdateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.saveGivenGroup(options);
    },
    doDestroyGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doDestroyGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.saveGivenGroup(options);
    },
    // User :: Groups :: Create
    showCreate: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showCreate(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateUserGroupsTabPanelAndActivateUserAddGroupTab();
        return me;
    },
    doCreateGroup: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doCreateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        var formPanel = button.up('coreformpanel');
        var formData = formPanel.getValues();
        var title = formData.title;
        var description = formData.description;
        var newGroup = {
            title: title,
            description: description,
            createdById: X.authenticatedEntity.get('id')
        };
        var group = Ext.create('X.model.Group', newGroup);
        var errors = group.validate();
        if (!errors.isValid()) {
            me.generateFailedWindow({
                message: errors.getAt(0).
                        getMessage()
            });
        }
        else {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.doCreateGroup(): Will call saveGivenGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            var groupsStore = Ext.getStore('GroupsStore');
            groupsStore.add(group);
            me.saveGivenGroup({
                group: group
            });
        }
        return me;
    },
    updateAllUiWithGivenGroupData: function(group) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.updateAllUiWithGroupData(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (Ext.isObject(group)) {
            var userGroupContainer = me.getUserGroupContainer();
            var userEditGroupContainer = me.getUserEditGroupContainer();
            if (Ext.isObject(userGroupContainer)) {
                userGroupContainer.setRecordRecursive(group);
            }
            if (Ext.isObject(userEditGroupContainer)) {
                userEditGroupContainer.setRecordRecursive(group);
            }
        }
        return me;
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Groups.init()");
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Groups.launch()");
        }
    }
});