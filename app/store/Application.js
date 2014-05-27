Ext.define('X.store.Application', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.util.DelayedTask'
    ],
    config: {
        autoLoad: false,
        autoSync: false,
        mustBeEmptiedOnApplicationShutDown: true,
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
            }
//            ,
//            updaterecord: function(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
//                this.onUpdateRecord(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts);
//            }
        }
    },
    onBeforeLoad: function(store, operation, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onBeforeLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
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
        
        if (me.mustBeEmptiedOnApplicationShutDown && !me.isLoaded()) {
            X.storesToBeEmptiedOnApplicationShutdown.push(me);
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
