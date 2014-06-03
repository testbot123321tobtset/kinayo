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
        idsOfRecordsBeforeLoad: [
        ],
        isFirstLoad: null,
        countOnLoad: 0,
        emptyOnLastLoad: true,
        //        
//        Parse does not send "results" node with every one of its responses
        //        It only uses the node "results" when you are doing a GET to a Parse Class
        //        For instance, /classes/Group will use "results" but
        //        /classes/Group/dad657sd will not
        proxyReaderRootPropertyForParseCollectionOfObjects: 'results',
        //        This is the original root property that the proxy on the model
        //        was configured with
        originalReaderRootProperty: '',
        
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
        
        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if(proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if(url) {
                //        If the GET is to a Parse class, then set rootProperty on its proxy to the 
                //        value of me.getProxyRootPropertyOnParseGetOnClass(). After load, reset it back
                me.checkAndSetProxyReaderRootProperty();

                //        Set session if session exists in local storage
                me.setSessionHeaderFromSession();
            }
        }

        if (me.getAllCount() > 0) {
            var idsOfRecordsBeforeLoad = [
            ];
            me.each(function(thisRecord) {
                idsOfRecordsBeforeLoad.push(thisRecordget('objectId'));
            });
            me.setIdsOfRecordsBeforeLoad(idsOfRecordsBeforeLoad);
        }

        if (me.getCountOnLoad() === 0) {
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
        
        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if(proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if(url) {
                //        If the GET is to a Parse class, then set rootProperty on its proxy to the 
                //        value of me.getProxyRootPropertyOnParseGetOnClass(). After load, reset it back
                me.checkAndResetProxyReaderRootProperty();
            }
        }

        me.setCountOnLoad(me.getAllCount());

        if (!Ext.isBoolean(me.getIsFirstLoad())) {
            me.setIsFirstLoad(true);
        }
        else if (me.getIsFirstLoad()) {
            me.setIsFirstLoad(false);
        }

        return me;
    },
    onAddRecords: function(store, records, eOpts) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onAddRecords(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        if(!store.isLoaded()) {
            store.loaded = true;
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
    getAllStores: function() {
        return [
            Ext.getStore('AuthenticatedUserStore'),
            Ext.getStore('GroupsStore'),
            Ext.getStore('GroupsAUIsMemberOfStore'),
            Ext.getStore('GroupsCreatedByAUStore'),
            Ext.getStore('UsersStore')
        ];
    },
    isEmpty: function() {
        return this.getAllCount() === 0;
    },
    //    Sets session header with the given session token for all stores
    //    This calls setSessionHeader()
    setSessionHeaderForAllStores: function(sessionToken) {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application.setSessionHeaderForAllStores(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var allStores = me.getAllStores();
        if (!Ext.isEmpty(allStores)) {
            Ext.Array.each(allStores, function(thisStore) {
                if(Ext.isObject(thisStore) && !Ext.isEmpty(thisStore)) {
                    thisStore.setSessionHeader(sessionToken);
                }
            });
        }
        
        return me;
    },
    //    Sets session header with the given session token
    setSessionHeader: function(sessionToken) {
        var me = this;
        
        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if(proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if(url) {
                var proxyHeaders = proxy.getHeaders();
                proxyHeaders['X-Parse-Session-Token'] = sessionToken;
                proxy.setHeaders(proxyHeaders);
            }
        }
        
        return me;
    },
    //    Resets session header to null
    resetSessionHeader: function() {
        var me = this;

        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if (proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if (url) {
                var proxyHeaders = proxy.getHeaders();
                proxyHeaders['X-Parse-Session-Token'] = null;
                proxy.setHeaders(proxyHeaders);
            }
        }

        return me;
    },
    //    This sets session headers from session stored in localstorage if any
    setSessionHeaderFromSession: function() {
        var me = this;
        
        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if (proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if (url) {
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
                                else if (!taskCondition() && runTaskCount >= noOfTimesToBeRun) {
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
    },
    shouldSetProxyReaderRootPropertyToRootPropertyForParseCollectionOfObjects: function() {
        var me = this;

        //        If the GET is to a Parse class, then set rootProperty on its proxy to the 
        //        value of me.getProxyRootPropertyOnParseGetOnClass(). After load, reset it back
        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if(proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if(url) {
                var urlPathInArray = url.getUrlPathInArray();
                if (Ext.Array.contains(urlPathInArray, 'users')) {
                    //            The url is going to be:
                    //              1. /users/ – we are concerned with case, or
                    //              3. /users/me, or
                    //              2. /users/adsa657
                    var indexOfUsersKey = Ext.Array.indexOf(urlPathInArray, 'users');
                    var itemAfterUsersKey = urlPathInArray[indexOfUsersKey + 1];
                    if (!Ext.isString(itemAfterUsersKey)) {
                        return true;
                    }
                }
                else {
                    //            The url if 'classes' is present:
                    //              1. /classes/<Model/Class Name> – we are concerned with case, or
                    //              2. /classes/<Model/Class Name>/<Model Id>
                    var indexOfClassesKey = Ext.Array.indexOf(urlPathInArray, 'classes');
                    var itemAfterClassesKey = urlPathInArray[indexOfClassesKey + 2];
                    if (!Ext.isString(itemAfterClassesKey)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    },
    checkAndSetProxyReaderRootProperty: function() {
        var me = this;
        
        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if (proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if (url) {
                if (me.shouldSetProxyReaderRootPropertyToRootPropertyForParseCollectionOfObjects()) {
                    proxy.
                            getReader().
                            setRootProperty(me.getProxyReaderRootPropertyForParseCollectionOfObjects());
                }
                else {
                    proxy.
                            getReader().
                            setRootProperty(me.getOriginalReaderRootProperty());
                }

                console.log('*******BEFORE LOAD********');
                console.log(me.getProxy().
                        getReader().
                        getRootProperty());
            }
        }

        return me;
    },
    checkAndResetProxyReaderRootProperty: function() {
        var me = this;

        var proxy = Ext.isObject(me.getProxy()) ? me.getProxy() : false;
        if (proxy) {
            var url = ('getUrl' in proxy && Ext.isFunction(proxy.getUrl)) ? proxy.getUrl() : false;
            if (url) {
                proxy.getReader().
                        setRootProperty(me.getOriginalReaderRootProperty());

                console.log('*******AFTER LOAD********');
                console.log(proxy.getReader().
                        getRootProperty());
            }
        }

        return me;
    },
    updateViews: function() {
        var me = this;

        console.log('*********** UPDATE VIEW TO THIS STORE:');
        console.log(me.getData());

        var allComponentsToBeQueriedForStoreUpdates = Ext.ComponentQuery.query('list, dataview');
        Ext.each(allComponentsToBeQueriedForStoreUpdates, function(thisComponent) {
            if ('getStore' in thisComponent && Ext.isFunction(thisComponent.getStore) && Ext.isObject(thisComponent.getStore()) && 'refresh' in thisComponent && Ext.isFunction(thisComponent.refresh) && thisComponent.getStore() === me) {
                thisComponent.refresh();
            }
        });

        return me;
    }
});