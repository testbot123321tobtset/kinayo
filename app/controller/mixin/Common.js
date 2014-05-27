Ext.define('X.controller.mixin.Common', {
    // Options format:
    // {
    //      operation: <operation object>,
    //      model: <model instance>,
    //      message: string (optional),
    //      fn: function (optional – this will be sent as a callback to the window UX if any),
    //      silent: boolean – this determines whether or not the user is shown an explicit feedback after the operation is completed
    // }
    // Name of the function responsible for generating user feedback gets generated using the following format:
    // generate<title-cased model name><title-cased 'Successfully'/'Failed' depending on whether operation was successful><title-cased action name in past tense e.g. 'Destroyed' for destroy function>Window
    commitOrRejectModelAndGenerateUserFeedbackOnSavingModel: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: commitOrRejectModelAndGenerateUserFeedbackOnSavingModel(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var silent = (Ext.isObject(options) && Ext.isBoolean(options.silent)) ? options.silent : false;
        var model = Ext.isObject(options.model) ? options.model : false,
                modelFullClassName = model.modelName,
                modelName = modelFullClassName.substr(modelFullClassName.lastIndexOf('.') + 1);
        var operation = Ext.isObject(options.operation) ? options.operation : false;
        if(operation && model) {
            var action = operation.getAction(),
                    camelizedActionName = action.title(),
                    actionNameInPastTense = (camelizedActionName === 'Destroy') ? (camelizedActionName + 'ed') : (camelizedActionName + 'd');
            var wasSuccessful = operation.wasSuccessful(),
                    successfullyOrFailedString = wasSuccessful ? 'Successfully' : 'Failed';
            var generateWindowFunctionName = 'generate' + modelName + successfullyOrFailedString + actionNameInPastTense + 'Window';
            if (me.getDebug()) {
                console.log('Debug: X.controller.mixin.Factory: commitOrRejectModelAndGenerateUserFeedbackOnSavingModel(): action: ' + action + ', wasSuccessful: ' + wasSuccessful + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                console.log('Debug: X.controller.mixin.Factory: Might call function name: ' + generateWindowFunctionName + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
//            Actually do stuff
//            For instance, this will fire destroyedgroup
            Ext.Viewport.fireEvent((actionNameInPastTense + modelName).toLowerCase(), options);
            if(wasSuccessful) {
                model.commit();
            }
            else {
                model.reject();
            }
//            If not silent, this will generate a confirmation window
            !silent && me[generateWindowFunctionName].call(me, options);
        }
        
        return me;
    },
    updateViewsBoundToGivenRecord: function(options) {
        var me = this;
        
        options = Ext.isObject(options) ? options : false;
        if(Ext.isObject(options)) {
            var modelName = ('modelName' in options && Ext.isString(options.modelName)) ? options.modelName : false;
            var record = ('record' in options && Ext.isObject(options.record)) ? options.record : false;
            var store = ('store' in options && Ext.isObject(options.store)) ? options.store : false;
//            Update views that have records bound to them
            if((Ext.isString(modelName) && Ext.isObject(record))) {
                var model = Ext.isString(modelName) ? X.model[modelName] : false;
                var recordId = Ext.isObject(record) ? record.getId() : false;
                var updateModel = model && recordId;
                var allComponentsToBeQueriedForModelUpdates = Ext.ComponentQuery.query('corecontainer, corepanel, tabpanel, coreformpanel');
                if (updateModel) {
                    Ext.each(allComponentsToBeQueriedForModelUpdates, function(thisComponent) {
                        if ('getRecord' in thisComponent && Ext.isFunction(thisComponent.getRecord) && Ext.isObject(thisComponent.getRecord())) {
                            var thisRecord = thisComponent.getRecord();
                            var thisRecordId = thisRecord.getId();
                            if (thisRecord instanceof model && thisRecordId === recordId) {
                                thisComponent.setRecordRecursive(thisRecord);
                                thisComponent.updateRecordDataRecursive(thisRecord);
                            }
                        }
                    });
                }
            }
//            When a record loads, views with stores that have that record in them must also update
            if (store) {
                var allComponentsToBeQueriedForStoreUpdates = Ext.ComponentQuery.query('list, dataview');
                Ext.each(allComponentsToBeQueriedForStoreUpdates, function(thisComponent) {
                    if ('getStore' in thisComponent && Ext.isFunction(thisComponent.getStore) && Ext.isObject(thisComponent.getStore()) && 'refresh' in thisComponent && Ext.isFunction(thisComponent.refresh) && thisComponent.getStore() === store) {
                        thisComponent.refresh();
                    }
                });
            }
        }
        
        return me;
    }
});
