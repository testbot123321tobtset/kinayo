Ext.define('X.controller.Groups', {
    extend: 'X.controller.Main',
    requires: [
        'X.view.plugandplay.UserGroupContainer',
        'X.view.plugandplay.userGroupEditContainer',
        'X.view.plugandplay.InteractiveUsersListContainer',
        'X.view.plugandplay.NonInteractiveUsersListContainer',
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
                addgroup: 'onAddGroup',
                editgroup: 'onEditGroup',
                editgroupvalidationfailed: 'onEditGroupValidationFailed',
                updatedgroup: 'onUpdatedGroup',
                destroygroupmessageshow: 'onDestroyGroupMessageShow',
                destroygroup: 'onDestroyGroup',
                destroyedgroup: 'onDestroyedGroup'
            },
            // User :: Groups
            userGroupsTabPanel: {
                activeitemchange: 'onUserGroupsTabPanelPanelActiveItemChange'
            },
            // User :: Groups :: Feeds
            userGroupsList: {
                itemtap: 'onUserGroupsListItemTap'
            },
            // User :: Groups :: Feed data
            userGroupContainerMoreButton: {
                tap: 'onUserGroupContainerMoreButtonTap'
            },
            userGroupContainerBackButton: {
                tap: 'onUserGroupContainerBackButtonTap'
            },
            // User :: Groups :: Group edit
            userGroupEditFormPanelSelectContactsButton: {
                tap: 'onUserGroupEditFormPanelSelectContactsButtonTap'
            },
            userGroupEditContainerBackButton: {
                tap: 'onuserGroupEditContainerBackButtonTap'
            },
            // User :: Groups :: Create
            userGroupCreateSubmitButton: {
                tap: 'onUserGroupCreateSubmitButtonTap'
            },
            userGroupCreateSelectContactsButton: {
                tap: 'onUserGroupCreateSelectContactsButtonTap'
            },
            userGroupAddFormPanelSelectContactsButton: {
                tap: 'onUserGroupAddFormPanelSelectContactsButtonTap'
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
            userGroupEditContainer: '#userGroupEditContainer',
            userGroupEditContainerTopToolbar: '#userGroupEditContainer #userGroupEditContainerToolbar',
            userGroupEditContainerBackButton: '#userGroupEditContainer #userGroupEditContainerToolbar #backButton',
            userGroupEditFormPanel: '#userGroupEditFormPanel',
            userGroupEditFormPanelUsersListContainer: '#userGroupEditFormPanel #usersListContainer',
            userGroupEditFormPanelUsersList: '#userGroupEditFormPanel #usersListContainer #usersList',
            userGroupEditFormPanelSelectContactsButton: '#userGroupEditFormPanel #selectContactsButton',
            // User :: Groups :: Create
            userGroupAddFormPanel: '#userGroupAddFormPanel',
            userGroupAddFormPanelUserList: '#userGroupAddFormPanel interactiveuserslist',
            userGroupAddFormPanelSelectContactsButton: '#userGroupAddFormPanel #selectContactsButton',
            userGroupCreateSubmitButton: '#userGroupAddFormPanel #submitButton'
        }
    },
    /*
     *    ROUTE HANDLERS
     */
    //    User :: Groups :: Feeds
    showGroupsList: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showGroupsList(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var loadingContainer = X.view.plugandplay.LoadingContainer;

        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
        if (groupsStore) {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.showGroupsList(): Will first try to load groups store: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            
            var hasGroupStoreLoaded = groupsStore.isLoaded();
            if(hasGroupStoreLoaded) {
                
                me.generateGroupslist(groupsStore)
            }
            else {
                
                loadingContainer.open(X.XConfig.getMESSAGES().LOADING.GROUPS);
                
                groupsStore.
                        waitWhileLoadingAndCallbackOnLoad({
                            fn: function() {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.Groups.showGroupsList(): Groups store is now loaded: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }

                                me.generateGroupslist(groupsStore);
                                
                                loadingContainer.close();
                            }
                        });
            }
        }

        return me;
    },
    //    User :: Groups :: Feeds: Helper
    //    No error checking is done on the arguments: make sure you send in all these arguments correctly
    generateGroupslist: function(groupsStore) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.generateGroupslist(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        me.generateUserGroupsTabPanelAndActivateUserGroupFeedsTab();
        me.addGroupsListToGroupsFeedTabWithGivenGroupsStore(groupsStore);
        me.getPageUserRoot().
                closeEverythingAboveMe();

        return false;
    },
    //    User :: Groups :: Feed data
    showFeedUiForGivenGroupId: function(groupId) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
        if (groupsStore) {

            groupId = (Ext.isString(groupId) && !Ext.isEmpty(groupId)) ? groupId : false;
            if (groupId) {

                var hasGroupStoreLoaded = groupsStore.isLoaded();
                if (hasGroupStoreLoaded) {
                    
                    var group = groupsStore.
                            getById(groupId);
                    group = (Ext.isObject(group) && !Ext.isEmpty(group)) ? group : false;
                    if(group) {
                        
                        me.generateFeedUi(group, groupsStore);
                    }
                }
                else {
                    
                    X.view.plugandplay.LoadingContainer.open(X.XConfig.getMESSAGES().LOADING.GROUPS);

                    groupsStore.
                            waitWhileLoadingAndCallbackOnLoad({
                                fn: function() {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.Groups.showFeedUiForGivenGroupId(): Groups store is now loaded: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                    
                                    var group = groupsStore.
                                            getById(groupId);
                                    group = (Ext.isObject(group) && !Ext.isEmpty(group)) ? group : false;
                                    if (group) {

                                        me.generateFeedUi(group, groupsStore);
                                    }

                                    X.view.plugandplay.LoadingContainer.close();
                                }
                            });
                }
                
                return me;
            }
        }

        return false;
    },
    //    User :: Groups :: Feed data: Helper
    //    No error checking is done on the arguments: make sure you send in all these arguments correctly
    generateFeedUi: function(group, groupsStore) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.generateFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        //                            Preload all UIs that go underneath this group feed UI
        me.generateUserGroupsTabPanelAndActivateUserGroupFeedsTab();
        me.addGroupsListToGroupsFeedTabWithGivenGroupsStore(groupsStore);

        //                            Actually show group feed UI
        me.generateAndFillViewportWithGroupDataWindow({
            group: group
        }).
                closeEverythingAboveMe();

        return false;
    },
    //    User :: Groups :: Create
    showCreate: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showCreate(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateUserGroupsTabPanelAndActivateUserAddGroupTab();
        return me;
    },
    //    User :: Groups :: Edit
    showEditGroupUiForGivenGroupId: function(groupId) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showEditFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
        if (groupsStore) {

            groupId = (Ext.isString(groupId) && !Ext.isEmpty(groupId)) ? groupId : false;
            if (groupId) {

                var hasGroupStoreLoaded = groupsStore.isLoaded();
                if (hasGroupStoreLoaded) {
                    
                    var group = groupsStore.
                            getById(groupId);
                    group = (Ext.isObject(group) && !Ext.isEmpty(group)) ? group : false;
                    if(group) {
                        
                        me.generateEditGroupUi(group, groupsStore);
                    }
                }
                else {
                    
                    X.view.plugandplay.LoadingContainer.open(X.XConfig.getMESSAGES().LOADING.GROUPS);

                    groupsStore.
                            waitWhileLoadingAndCallbackOnLoad({
                                fn: function() {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.Groups.showFeedUiForGivenGroupId(): Groups store is now loaded: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                    
                                    var group = groupsStore.
                                            getById(groupId);
                                    group = (Ext.isObject(group) && !Ext.isEmpty(group)) ? group : false;
                                    if (group) {

                                        me.generateEditGroupUi(group, groupsStore);
                                    }

                                    X.view.plugandplay.LoadingContainer.close();
                                }
                            });
                }
                
                return me;
            }
        }
        
        return false;
    },
    //    User :: Groups :: Edit: Helper
    //    No error checking is done on the arguments: make sure you send in all these arguments correctly
    generateEditGroupUi: function(group, groupsStore) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.generateFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        //                                Preload all UIs that go underneath this group feed UI
        me.generateUserGroupsTabPanelAndActivateUserGroupFeedsTab();
        me.addGroupsListToGroupsFeedTabWithGivenGroupsStore(groupsStore);
        me.generateAndFillViewportWithGroupDataWindow({
            group: group
        });

        //                                Actually show edit group UI
        me.generateAndFillViewportWithEditGroupWindow({
            group: group,
            showcontainer: true
        }).
                closeEverythingAboveMe();

        return false;
    },
    /*
     *    VIEWPORT EVENT HANDLERS
     */
    onAddGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onAddGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        return me.saveGivenGroup(options);
    },
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
    onUpdatedGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUpdatedGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        //        This is a hack. After a group is created from group add form panel,
        //        if you try to edit the group, the group does get edited but the list still shows the unedited
        //        form the group. Refreshing this does the trick
        
        var userGroupsList = me.getUserGroupsList();
        userGroupsList = (Ext.isObject(userGroupsList) && !Ext.isEmpty(userGroupsList)) ? userGroupsList : false;
        if (userGroupsList) {

            userGroupsList.refresh();
        }
        
        return me;
    },
    onDestroyGroupMessageShow: function(options) {
        var me = this;
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
        
        //        This is essentially a big hack. After a group is created from group add form panel,
        //        if you try to destroy the group, the group does get destroyed but hangs out in the store anyway
        //        This record has group._isErased set to true! I have no idea why this thing doesn't leave the store
        //        I tried everything I could, but this is the ony thing that worked. Note that this doesn't happen
        //        to any other records – ones that were not just created. Even the one that was just created deletes
        //        correctly if I try to delete it after reloading the page. But reloading the page isn't an option in
        //        a native app, so I stuck with the hack
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {
            
            var group = 'model' in options ? options.model : false;
            if(group) {
                
                group = (Ext.isObject(group) && !Ext.isEmpty(group)) ? group : false;
                if(group) {
                    
                    var groupsStore = Ext.getStore('GroupsStore');
                    groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
                    if (groupsStore) {
                        
                        group = groupsStore.getById(group.getId());
                        group = (Ext.isObject(group) && !Ext.isEmpty(group)) ? group : false;
                        if (group) {
                            
                            var isErased = '_isErased' in group ? group._isErased : false;
                            if(isErased) {
                                
                                isErased = Ext.isBoolean(isErased) ? isErased : false;
                                if(isErased) {
                        
                                    var data = groupsStore.getData();
                                    data.remove(group);
                                    
                                    var userGroupsList = me.getUserGroupsList();
                                    userGroupsList = (Ext.isObject(userGroupsList) && !Ext.isEmpty(userGroupsList)) ? userGroupsList : false;
                                    if (userGroupsList) {

                                        userGroupsList.refresh();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return me;
    },
    /*
     *    OTHER EVENT HANDLERS
     */
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
    onUserGroupCreateSubmitButtonTap: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupCreateSubmitButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.doCreateGroup();

        return me;
    },
    onuserGroupEditContainerBackButtonTap: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onuserGroupEditContainerBackButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        me.redirectTo('user/profile/groups/feeds/' + button.up('#userGroupEditContainer').
                getRecord().
                getId());
        
        return me;
    },
    onUserGroupEditFormPanelSelectContactsButtonTap: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupEditFormPanelSelectContactsButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        me.generateAndFillViewportWithInteractiveUsersListContainer({
            callback: {
                fn: function() {
                    
                    var args = arguments[0];
                    var interactiveUsersListContainer = 'listContainer' in args ? args.listContainer : false;
                    if (interactiveUsersListContainer) {
                        
                        var interactiveList = interactiveUsersListContainer.down('interactiveuserslist');
                        var interactiveList = (Ext.isObject(interactiveList) && !Ext.isEmpty(interactiveList)) ? interactiveList : false;
                        if (interactiveList) {
                            
                            interactiveUsersListContainer.setTitle('Pick Group Members');

                            var friendsStore = Ext.getStore('FriendsStore');
                            friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                            if (friendsStore) {
                                
                                interactiveList.setStore(friendsStore);
                            }
                        }
                    }
                },
                scope: me
            }
        });
        
        return me;
    },
    onUserGroupAddFormPanelSelectContactsButtonTap: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupAddFormPanelSelectContactsButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        me.generateAndFillViewportWithInteractiveUsersListContainer({
            callback: {
                fn: function() {
                    
                    var args = arguments[0];
                    var interactiveUsersListContainer = 'listContainer' in args ? args.listContainer : false;
                    if (interactiveUsersListContainer) {
                        
                        var interactiveList = interactiveUsersListContainer.down('interactiveuserslist');
                        var interactiveList = (Ext.isObject(interactiveList) && !Ext.isEmpty(interactiveList)) ? interactiveList : false;
                        if (interactiveList) {
                            
                            interactiveUsersListContainer.setTitle('Pick Group Members');

                            var friendsStore = Ext.getStore('FriendsStore');
                            friendsStore = Ext.isObject(friendsStore) ? friendsStore : false;
                            if (friendsStore) {
                                
                                interactiveList.setStore(friendsStore);
                            }
                        }
                    }
                },
                scope: me
            }
        });
        
        
//        var interactiveUsersListContainer = me.generateAndFillViewportWithInteractiveUsersListContainer();
//        interactiveUsersListContainer = (Ext.isObject(interactiveUsersListContainer) && !Ext.isEmpty(interactiveUsersListContainer)) ? interactiveUsersListContainer : false;
//        if(interactiveUsersListContainer) {
//            
//            interactiveUsersListContainer.setTitle('Pick Group Members');
//            
//            console.log('do after logic for when the user has selected a few contacts');
//        }
        
        return me;
    },
    /*
     *    HELPERS
     */
    doCreateGroup: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doCreateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var formPanel = me.getUserGroupAddFormPanel();
        var formData = formPanel.getValues();
        var title = formData.title;
        var description = formData.description;

        var newGroup = {
            title: title,
            description: description,
            createdById: X.authenticatedUser.get('objectId')
        };
        var group = Ext.create('X.model.Group', newGroup);
        
        var userGroupAddFormPanelUserList = me.getUserGroupAddFormPanelUserList();
        userGroupAddFormPanelUserList = (Ext.isObject(userGroupAddFormPanelUserList) && !Ext.isEmpty(userGroupAddFormPanelUserList)) ? userGroupAddFormPanelUserList : false;
        if(userGroupAddFormPanelUserList) {
            
            group.setHasMemberUsersFieldForGivenUsers(userGroupAddFormPanelUserList.getSelection());
        }
        
        var errors = group.validate();
        if (!errors.isValid()) {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.doCreateGroup(): Group validation failed: Found errors:');
                console.log(errors);
                console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            group.reject();
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
            groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
            if (groupsStore) {
                
                groupsStore.add(group);
            }
            
            me.saveGivenGroup({
                group: group,
                validated: true,
                callback: {
                    fn: function() {
                        
                        X.view.plugandplay.NotificationContainer.openAndWaitAndClose('Created ' + group.get('title'));
                    },
                    scope: me
                }
            });
        }
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
    //    Calls setStore() on the user groups list view
    addGroupsListToGroupsFeedTabWithGivenGroupsStore: function(groupsStore) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.addGroupsListToGroupsFeedTabWithGivenGroupsStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var userGroupsList = me.getUserGroupsList();
        userGroupsList = (Ext.isObject(userGroupsList) && !Ext.isEmpty(userGroupsList)) ? userGroupsList : false;
        if(userGroupsList) {
            
            userGroupsList.close();
            
            userGroupsList.setStore(groupsStore);
            userGroupsList.deselectAll();
            
            userGroupsList.open();
        }

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
        else if (userGroupEditFormPanelUsersList.getOnItemDisclosure() !== isGroupCreatedByMe) {
            userGroupEditFormPanelUsersListContainer.remove(userGroupEditFormPanelUsersList);
            shouldCreateNewUsersList = true;
        }
        if (shouldCreateNewUsersList) {
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
    //    This seems like its working without having to update the UI explicitly
    //    updateAllUiWithGivenGroupData: function(group) {
    //        var me = this;
    //        if (me.getDebug()) {
    //            console.log('Debug: X.controller.Groups.updateAllUiWithGroupData(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
    //        }
    //        if (Ext.isObject(group)) {
    //            //            This supposed to update ui with group data, but try out the method updateViewsBoundToGivenRecord in Common
    //            //            var userGroupContainer = me.getUserGroupContainer();
    //            //            var userGroupEditContainer = me.getUserGroupEditContainer();
    //            //            if (Ext.isObject(userGroupContainer)) {
    //            //                userGroupContainer.setRecordRecursive(group);
    //            //            }
    //            //            if (Ext.isObject(userGroupEditContainer)) {
    //            //                userGroupEditContainer.setRecordRecursive(group);
    //            //            }
    //        }
    //        return me;
    //    },
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