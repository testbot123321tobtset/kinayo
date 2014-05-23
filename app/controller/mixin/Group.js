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
                        me.loadGroupsStore();
                        if (Ext.isString(operation.getResponse().responseText)) {
                            var serverResponse = Ext.decode(operation.getResponse().responseText);
                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                            if (serverResponseSuccess) {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            }
                            else {
                                if (!serverResponseMessage) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                        }
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            message: serverResponseMessage,
                            silent: silent,
                            // This is the callback function that feeds into the callback for
                            // what happens when user feedback is shown and when the user
                            // reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            }
                        });
                    },
                    failure: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        me.loadGroupsStore();
                        if (Ext.isString(operation.getResponse().responseText)) {
                            var serverResponse = Ext.decode(operation.getResponse().responseText);
                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                            if (!serverResponseSuccess) {
                                if (!serverResponseMessage) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                            else {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            }
                        }
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            message: serverResponseMessage,
                            silent: silent,
                            // This is the callback function that feeds into the callback for
                            // what happens when user feedback is shown and when the user
                            // reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            }
                        });
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
    }
});