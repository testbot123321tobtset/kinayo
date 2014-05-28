Ext.define('X.store.Application', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.util.DelayedTask'
    ],
    config: {
        idProperty: 'objectId',
        
        autoLoad: false,
        autoSync: false,
        
        useDefaultXhrHeader: false,
        
        idsOfRecordsBeforeLoad: [],
        isFirstLoad: null,
        countOnLoad: 0,
        emptyOnLastLoad: true,
        
        listeners: {
            beforeload: function(store, operation, options) {
                this.onBeforeLoad(store, operation, options);
            },
            load: function(store, records, successful, operation, eOpts) {
                this.onLoad(store, records, successful, operation, eOpts);
            },
            addrecords: function(store, records, successful, operation, eOpts) {
                this.onAddRecords(store, records, eOpts);
            }
//            ,
//            updaterecord: function(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
//                this.onUpdateRecord(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts);
//            }
        }
    },
    
//    
//    EVENT HANDLERS
//
    onBeforeLoad: function(store, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onBeforeLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
//        Set session if session exists in local storage
        me.setSessionHeaderFromSession();
        
        if (me.getAllCount() > 0) {
            var idsOfRecordsBeforeLoad = [];
            me.each(function(thisRecord) {
                idsOfRecordsBeforeLoad.push(thisRecord.get('id'));
            });
            me.setIdsOfRecordsBeforeLoad(idsOfRecordsBeforeLoad);
        }
        
        if(me.getCountOnLoad() === 0) {
            me.setEmptyOnLastLoad(true);
        }
        else {
            me.setEmptyOnLastLoad(false);
        }
        
        return me;
    },
    onLoad: function(store, records, successful, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        me.setCountOnLoad(me.getAllCount());
        
        if(!Ext.isBoolean(me.getIsFirstLoad())) {
            me.setIsFirstLoad(true);
        }
        else if(me.getIsFirstLoad()) {
            me.setIsFirstLoad(false);
        }
        
        return me;
    },
    onAddRecords: function(store, records, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onAddRecords(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        return me;
    },
    onUpdateRecord: function(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onUpdateRecord(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        return me;
    },
    
//    
//    HELPER METHODS
//
    isEmpty: function() {
        return this.getAllCount() === 0;
    },
    
//    Sets session header with the given session token
    setSessionHeader: function(sessionToken) {
        var me = this;
        
        var proxy = me.getProxy();
        var proxyHeaders = proxy.getHeaders();
        proxyHeaders['X-Parse-Session-Token'] = sessionToken;
        proxy.setHeaders(proxyHeaders);
        
        return me;
    },
//    Resets session header to null
    resetSessionHeader: function() {
        var me = this;
        
        var proxy = me.getProxy();
        var proxyHeaders = proxy.getHeaders();
        proxyHeaders['X-Parse-Session-Token'] = null;
        proxy.setHeaders(proxyHeaders);
        
        return me;
    },
//    This sets session headers from session stored in localstorage if any
    setSessionHeaderFromSession: function() {
        var me = this;
        
        var parseSessionStore = Ext.getStore('ParseSessionStore');
        if (Ext.isObject(parseSessionStore)) {
            var session = parseSessionStore.getSession();
            if (Ext.isObject(session) && !Ext.isEmpty(session)) {
                var userIdFromSession = ('userId' in session && Ext.isString(session.userId) && !Ext.isEmpty(session.userId)) ? session.userId : false;
                if (userIdFromSession) {
                    var sessionToken = ('sessionToken' in session && Ext.isString(session.sessionToken) && !Ext.isEmpty(session.sessionToken)) ? session.sessionToken : false;
                    if (sessionToken) {
                        me.setSessionHeader(sessionToken);
                    }
                }
            }
        }
        
        return me;
    },
    
//    This performs total reset
//    This is extended by child stores to perform resets other than the default of resetting session header
    reset: function() {
        var me = this;
        
        me.resetSessionHeader();
        
        return me;
    },
    
    getSyncableRecords: function() {
        var me = this;
        
        return [
            {
                newRecords: me.getNewRecords()
            },
            {
                updatedRecords: me.getUpdatedRecords()
            },
            {
                removedRecords: me.getRemovedRecords()
            }
        ];
    },
    
    // Assumes that the store is either loading or has already loaded
    // This will not attempt to load a store if found to be otherwise
    waitWhileLoadingAndCallbackOnLoad: function(callbackOnLoad) {
        var me = this;
        if (me.isLoading()) {
            if (X.config.Config.getDEBUG()) {
                console.log('Debug: X.store.Application: ' + me.getStoreId() + ': waitWhileLoadingAndCallbackOnLoad(): Is running because this store is still loading');
            }
            me.runTask({
                fn: function() {
                    if (X.config.Config.getDEBUG()) {
                        console.log('Debug: X.store.Application: ' + me.getStoreId() + ': waitWhileLoadingAndCallbackOnLoad(): Will now execute callback function');
                    }
                    me.executeCallback(callbackOnLoad);
                },
                condition: function() {
                    return me.isLoaded();
                },
                scope: me
            });
            return me;
        }
        else if (me.isLoaded()) {
            if (X.config.Config.getDEBUG()) {
                console.log('Debug: X.store.Application: ' + me.getStoreId() + ': waitWhileLoadingAndCallbackOnLoad(): Will not run because this store has already loaded once. Calling callback immediately');
            }
            me.executeCallback(callbackOnLoad);
            return false;
        }
    },
    executeCallback: function(callback) {
        var me = this;
        callback = Ext.isObject(callback) ? callback : false;
        if (callback) {
            var callbackFn = Ext.isFunction(callback.fn) ? callback.fn : false;
            if (callbackFn) {
                var callbackScope = Ext.isObject(callback.scope) ? callback.scope : me;
                return callbackFn.call(callbackScope);
            }
            
        }
        return false;
    },
    /*
     * task is of the format:
     * {
     *      fn: function,
     *      condition: function,
     *      scope: object,
     *      delay: number,
     *      limit: number // total time you want this task to keep trying
     * }
     */
    runTask: function(task) {
        var store = this;
        var runTaskCount = 0,
                localRunTask = function(task) {
                    var me = this;
                    task = Ext.isObject(task) ? task : false;
                    if (task) {
                        var taskFn = Ext.isFunction(task.fn) ? task.fn : false;
                        var taskCondition = Ext.isFunction(task.condition) ? task.condition : false;
                        if (taskFn && taskCondition) {
                            var taskScope = Ext.isObject(task.scope) ? task.scope : me;
                            var taskDelay = Ext.isNumber(task.delay) ? task.delay : 100;
                            var taskLimit = Ext.isNumber(task.limit) ? task.limit : 5000;
                            var noOfTimesToBeRun = taskLimit / taskDelay;
                            Ext.create('Ext.util.DelayedTask', function() {
                                if (!taskCondition() && runTaskCount < noOfTimesToBeRun) {
                                    if (X.config.Config.getDEBUG()) {
                                        console.log('Debug: X.store.Application: runTask(): Is running for store: ' + store.getStoreId() + ' : Run # - ' + runTaskCount + ', Runs left - ' + (noOfTimesToBeRun - runTaskCount));
                                    }
                                    localRunTask(task);
                                }
                                else if (taskCondition()) {
                                    if (X.config.Config.getDEBUG()) {
                                        console.log('Debug: X.store.Application: runTask(): Has stopped running for store: ' + store.getStoreId() + ' : Run # - ' + runTaskCount + ', Runs left - ' + (noOfTimesToBeRun - runTaskCount) + ', Will call callback');
                                    }
                                    runTaskCount = 0;
                                    taskFn.call(taskScope);
                                }
                                else if(!taskCondition() && runTaskCount >= noOfTimesToBeRun) {
                                    if (X.config.Config.getDEBUG()) {
                                        console.log('Debug: X.store.Application: runTask(): Has stopped running for store: ' + store.getStoreId() + ' : Run # - ' + runTaskCount + ', Runs left - ' + (noOfTimesToBeRun - runTaskCount) + ', Will not call callback');
                                    }
                                    runTaskCount = 0;
                                }
                                runTaskCount++;
                            }, taskScope).
                                    delay(taskDelay);
                        }
                    }
                };
        localRunTask(task);
    }
});
