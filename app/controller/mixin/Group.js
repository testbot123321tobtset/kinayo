Ext.define('X.controller.mixin.Group', {
    saveGivenGroup: function(options) {
        var me = this;
        var group = (Ext.isObject(options) && Ext.isObject(options.group)) ? options.group : false;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (Ext.isObject(group)) {
            var errors = group.validate();
            if (!errors.isValid()) {
                group.reject();
                me.generateUserFailedUpdatedWindow({
                    message: errors.getAt(0).
                            getMessage()
                });
                return false;
            }
            else {
                var silent = Ext.isBoolean(options.silent) ? options.silent : false;
                
                var typeOfSave = Ext.isString(options.typeOfSave) ? options.typeOfSave : 'edit';
                
                var optionsToSaveOperation = {
                    success: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            silent: silent,
//                            This is the callback function that feeds into the callback for
//                            what happens when user feedback is shown and when the user
//                            reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            },
                            scope: me
                        });
                        
                        console.log('>>>>>>>>>>');
                        console.log(record);
                        
                        
                        
//                        me.loadGroupsStore();
//                        if (Ext.isString(operation.getResponse().responseText)) {
//                            var serverResponse = Ext.decode(operation.getResponse().responseText);
//                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
//                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
//                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
//                            if (serverResponseSuccess) {
//                                if (me.getDebug()) {
//                                    console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                                }
//                            }
//                            else {
//                                if (!serverResponseMessage) {
//                                    if (me.getDebug()) {
//                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                                    }
//                                }
//                                else {
//                                    if (me.getDebug()) {
//                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                                    }
//                                }
//                            }
//                        }
//                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
//                            operation: operation,
//                            model: group,
//                            message: serverResponseMessage,
//                            silent: silent,
//                            // This is the callback function that feeds into the callback for
//                            // what happens when user feedback is shown and when the user
//                            // reacts to it
//                            fn: function() {
//                                me.hideAllWindows();
//                                me.redirectTo('user/profile/groups/feeds');
//                            }
//                        });
                    },
                    failure: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            silent: silent,
//                            This is the callback function that feeds into the callback for
//                            what happens when user feedback is shown and when the user
//                            reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            }
                        });
                        
                        
                        
                        
                        
//                        me.loadGroupsStore();
//                        if (Ext.isString(operation.getResponse().responseText)) {
//                            var serverResponse = Ext.decode(operation.getResponse().responseText);
//                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
//                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
//                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
//                            if (!serverResponseSuccess) {
//                                if (!serverResponseMessage) {
//                                    if (me.getDebug()) {
//                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                                    }
//                                }
//                                else {
//                                    if (me.getDebug()) {
//                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                                    }
//                                }
//                            }
//                            else {
//                                if (me.getDebug()) {
//                                    console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
//                                }
//                            }
//                        }
//                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
//                            operation: operation,
//                            model: group,
//                            message: serverResponseMessage,
//                            silent: silent,
////                            This is the callback function that feeds into the callback for
////                            what happens when user feedback is shown and when the user
////                            reacts to it
//                            fn: function() {
//                                me.hideAllWindows();
//                                me.redirectTo('user/profile/groups/feeds');
//                            }
//                        });
                    }
                };
                switch(typeOfSave) {
                    case 'edit':
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Will call save(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        group.save(optionsToSaveOperation);
                        break;
                    case 'destroy':
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Will call erase(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        group.erase(optionsToSaveOperation);
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            return false;
        }
        return me;
    },
    loadGroupsStore: function(successCallback, failureCallback) {
        var me = this;
        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore.load(function(records, successful) {
            if (!successful) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadGroupsStore(): Operation failed: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                var rawResponse = groupsStore.getProxy().
                        getReader().rawData;
                if (!rawResponse.success) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadGroupsStore(): Message from server: ' + rawResponse.message + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    me.executeCallback(failureCallback);
                }
            }
            else {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadGroupsStore(): Operation succeeded: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                me.executeCallback(successCallback);
            }
        });
        return me;
    },
    
    loadAllGroups: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.loadAllGroups(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        me.loadGroupsCreatedByAUStore().
                loadGroupsAUIsMemberOfStore();
        
        return me;
    },
    
    loadGroupsCreatedByAUStore: function(existsCallback, doesNotExistCallback) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.loadGroupsCreatedByAUStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var groupsCreatedByAUStore = Ext.getStore('GroupsCreatedByAUStore');
        if (Ext.isObject(groupsCreatedByAUStore)) {
            groupsCreatedByAUStore.load(function(records, operation, success) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadGroupsCreatedByAUStore(): Success: ' + success + ': Records received:');
                    console.log(records);
                    console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                
                if(success) {
                    if (!Ext.isEmpty(records)) {
                        me.executeCallback(existsCallback);
                    }
                    else {
                        me.executeCallback(doesNotExistCallback);
                    }
                }
                else {
                    me.executeCallback(doesNotExistCallback);
                }
            });
        }
        
        return me;
    },
    
    loadGroupsAUIsMemberOfStore: function(existsCallback, doesNotExistCallback) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.loadGroupsAUIsMemberOfStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var groupsAUIsMemberOfStore = Ext.getStore('GroupsAUIsMemberOfStore');
        if (Ext.isObject(groupsAUIsMemberOfStore)) {
            groupsAUIsMemberOfStore.load(function(records, operation, success) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadGroupsAUIsMemberOfStore(): Success: ' + success + ': Records received:');
                    console.log(records);
                    console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                
                if(success) {
                    if (!Ext.isEmpty(records)) {
                        me.executeCallback(existsCallback);
                    }
                    else {
                        me.executeCallback(doesNotExistCallback);
                    }
                }
                else {
                    me.executeCallback(doesNotExistCallback);
                }
            });
        }
        
        return me;
    },
    
    addToGroupsCreatedByAUStoreAndToGroupsAUIsMemberOfStore: function(groups) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.addToGroupsCreatedByAUStoreAndToGroupsAUIsMemberOfStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        groups = Ext.isObject(groups) ? [groups] : groups;
        groups = (Ext.isArray(groups) && !Ext.isEmpty(groups)) ? groups : false;
        if(groups) {
            var groupsAUIsMemberOfStore = Ext.getStore('GroupsAUIsMemberOfStore');
            var groupsCreatedByAUStore = Ext.getStore('GroupsCreatedByAUStore');
            if(Ext.isObject(groupsAUIsMemberOfStore) && Ext.isObject(groupsCreatedByAUStore)) {
                Ext.Array.each(groups, function(thisGroup) {
                    groupsAUIsMemberOfStore.add(thisGroup);
                    groupsCreatedByAUStore.add(thisGroup);
                });
            }
        }
        
        return me;
    }
});