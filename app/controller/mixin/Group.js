Ext.define('X.controller.mixin.Group', {
    /*
     * LOAD
     */
    //    For now, these stores are not loaded from the server; when the authenticated user store loads,
    //    we automatically grab these groups from authenticated user and set data in these stores. This
    //    is only to initialize these stores. If you need to later on load these stores, use these methods to 
    //    do so
    loadAllGroupsStores: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.loadAllGroupsStores(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        me.loadGroupsCreatedByAUStore().
                loadGroupsAUIsMemberOfStore();

        return me;
    },
    //    For now, these stores are not loaded from the server; when the authenticated user store loads,
    //    we automatically grab these groups from authenticated user and set data in these stores. This
    //    is only to initialize these stores. If you need to later on load these stores, use these methods to 
    //    do so
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

                if (success) {
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
    //    For now, these stores are not loaded from the server; when the authenticated user store loads,
    //    we automatically grab these groups from authenticated user and set data in these stores. This
    //    is only to initialize these stores. If you need to later on load these stores, use these methods to 
    //    do so
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

                if (success) {
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
    /*
     * SAVE
     */
    saveGivenGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {
            var group = ('group' in options && Ext.isObject(options.group) && !Ext.isEmpty(options.group)) ? options.group : false;
            if (group) {
                var typeOfSave = ('typeOfSave' in options && Ext.isString(options.typeOfSave) && !Ext.isEmpty(options.typeOfSave)) ? options.typeOfSave : 'edit';

                var hasBeenValidated = ('validated' in options && Ext.isBoolean(options.validated)) ? options.validated : false;
                if (typeOfSave !== 'destroy' && !hasBeenValidated) {
                    var errors = group.validate();
                    if (!errors.isValid()) {
                        group.reject();
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
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }

                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            silent: silent,
                            //                            This is the callback function called after 
                            //                            user feedback is shown and after the user
                            //                            reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            },
                            scope: me
                        });
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
                            //                            This is the callback function called after 
                            //                            user feedback is shown and after the user
                            //                            reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            }
                        });
                    }
                };


                switch (typeOfSave) {
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

                return me;
            }
        }

        return false;
    },
    /*
     * HELPERS
     */
    addToAllGroups: function(groups) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.addToAllGroups(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        groups = Ext.isObject(groups) ? [
            groups
        ] : groups;
        groups = (Ext.isArray(groups) && !Ext.isEmpty(groups)) ? groups : false;
        if (groups) {
            var groupsAUIsMemberOfStore = Ext.getStore('GroupsAUIsMemberOfStore');
            var groupsCreatedByAUStore = Ext.getStore('GroupsCreatedByAUStore');
            var groupsStore = Ext.getStore('GroupsStore');
            if (Ext.isObject(groupsAUIsMemberOfStore) && Ext.isObject(groupsCreatedByAUStore) && Ext.isObject(groupsStore)) {
                Ext.Array.each(groups, function(thisGroup) {
                    groupsAUIsMemberOfStore.add(thisGroup);
                    groupsCreatedByAUStore.add(thisGroup);
                    groupsStore.add(thisGroup);
                });
            }
        }

        return me;
    }
});