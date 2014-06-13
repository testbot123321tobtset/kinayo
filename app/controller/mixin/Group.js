Ext.define('X.controller.mixin.Group', {
    /*
     * LOAD
     */
    loadGroupsStore: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Group.loadGroupsStore(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var successCallback = false,
                failureCallback = false,
                callback = false,
                existsCallback,
                doesNotExistCallback;

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {

            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
            existsCallback = ('existsCallback' in options && Ext.isObject(options.existsCallback)) ? options.existsCallback : false;
            doesNotExistCallback = ('doesNotExistCallback' in options && Ext.isObject(options.doesNotExistCallback)) ? options.doesNotExistCallback : false;
        }

        var groupsStore = Ext.getStore('GroupsStore');
        groupsStore = Ext.isObject(groupsStore) ? groupsStore : false;
        if (groupsStore) {
            
            groupsStore.load(function(records, operation, success) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadGroupsStore(): Success: ' + success + ': Records received:');
                    console.log(records);
                    console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                
                if (success) {
                    
                    if (successCallback) {

                        successCallback.arguments = {
                            groups: records
                        };

                        me.executeCallback(successCallback);
                    }
                    
                    if (!Ext.isEmpty(records)) {
                        
                        if (existsCallback) {

                            existsCallback.arguments = {
                                groups: records
                            };

                            me.executeCallback(existsCallback);
                        }
                    }
                    else {
                        
                        doesNotExistCallback && me.executeCallback(doesNotExistCallback);
                    }
                }
                else {
                    
                    failureCallback && me.executeCallback(failureCallback);
                }
                
                callback && me.executeCallback(callback);
            });
            
            return me;
        }
            
        return false;
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
        
        var successCallback = false,
                failureCallback = false,
                callback = false;
        
        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if(options) {
            
            successCallback = ('successCallback' in options && Ext.isObject(options.successCallback)) ? options.successCallback : false;
            failureCallback = ('failureCallback' in options && Ext.isObject(options.failureCallback)) ? options.failureCallback : false;
            callback = ('callback' in options && Ext.isObject(options.callback)) ? options.callback : false;
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
                var showLoading = ('showLoading' in options && Ext.isBoolean(options.showLoading)) ? options.showLoading : true;

                var optionsToSaveOperation = {
                    success: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Success. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        
                        //                        showLoading && me.loadingContainer.close();

                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            silent: silent,
                            typeOfSave: typeOfSave,
                            //                            This is the callback function called after 
                            //                            user feedback is shown and after the user
                            //                            reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            },
                            scope: me
                        });
                        
                        successCallback && me.executeCallback(successCallback);
                    
                        callback && me.executeCallback(callback);
                    },
                    failure: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Failed. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        
                        //                        showLoading && me.loadingContainer.close();

                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: group,
                            silent: silent,
                            typeOfSave: typeOfSave,
                            //                            This is the callback function called after 
                            //                            user feedback is shown and after the user
                            //                            reacts to it
                            fn: function() {
                                me.hideAllWindows();
                                me.redirectTo('user/profile/groups/feeds');
                            }
                        });
                        
                        failureCallback && me.executeCallback(failureCallback);
                    
                        callback && me.executeCallback(callback);
                    }
                };


                switch (typeOfSave) {
                    case 'edit':
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Will call save(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        
                        //                        showLoading && me.loadingContainer.open();
                        
                        group.save(optionsToSaveOperation);
                        break;
                    case 'destroy':
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.Group.saveGivenGroup(): Will call erase(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        
                        //                        showLoading && me.loadingContainer.open();
                        
                        group.erase(optionsToSaveOperation);
                        break;
                    default:
                        break;
                }

                return me;
            }
        }

        return false;
    }
});