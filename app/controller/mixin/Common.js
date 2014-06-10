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

        options = (Ext.isObject(options) && !Ext.isEmpty(options)) ? options : false;
        if (options) {
            var model = ('model' in options && Ext.isObject(options.model) && !Ext.isEmpty(options.model)) ? options.model : false;
            if (model) {
                var operation = ('operation' in options && Ext.isObject(options.operation) && !Ext.isEmpty(options.operation)) ? options.operation : false;
                if (operation) {
                    var modelFullClassName = model.modelName,
                            modelName = modelFullClassName.substr(modelFullClassName.lastIndexOf('.') + 1);
                    
                    var typeOfSave = ('typeOfSave' in options && Ext.isString(options.typeOfSave) && !Ext.isEmpty(options.typeOfSave)) ? options.typeOfSave : 'edit';

                    var silent = ('silent' in options && Ext.isBoolean(options.silent)) ? options.silent : false;

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

                    //                    Commit or reject
                    if (wasSuccessful) {

                        //                        Only if the operation was successful, we need to make sure that if we receive any data from Parse,
                        //                        we take that data and merge it into our local copy of that record. This is because of the issue with
                        //                        Sencha Touch's proxy's reader not playing well with Parse's REST API response that sometimes is wrapped
                        //                        in the "results" node and sometimes isn't. We keep the reader configured so it can read a collection of
                        //                        Parse objects by having the root property in the proxy's reader set to "results". But unfortunately that
                        //                        means that when Parse sends back a single object without the results node, our proxy's reader fails to
                        //                        automatically sync the local copy with what Parse sent us, and so we do this manually here
                        var serverResponse = (Ext.isObject(operation.getResponse()) && !Ext.isEmpty(operation.getResponse())) ? operation.getResponse() : false;
                        if (serverResponse) {
                            // This means the operation was successful
                            var serverResponseText = ('responseText' in serverResponse && Ext.isString(serverResponse.responseText) && !Ext.isEmpty(serverResponse.responseText)) ? serverResponse.responseText : false;
                            if (serverResponseText) {
                                serverResponse = Ext.decode(serverResponseText);
                                if (Ext.isObject(serverResponse) && !Ext.isEmpty(serverResponse)) {
                                    var serverRecordData = serverResponse;
                                    var localRecordData = Ext.Object.merge(model.getData(), serverRecordData);
                                    model.setData(localRecordData);
                                }
                            }
                        }
                        
                        model.commit();
                        
                        //                        This is a hack. Sencha Touch will notify the stores related to the model
                        //                        automatically if the server is able to return the deleted record on successful erase
                        //                        But, Parse sends back an empty object on successful erase. This confuses Sencha Touch,
                        //                        and it complains that it could not find the record that was erased. So we need to handle this
                        //                        manually. The specific source is: http://docs.sencha.com/touch/2.3.2/source/Operation.html#Ext-data-Operation in
                        //                        processDestroy() method
                        //                        Related question in Sencha Touch forums:
                        //                        http://www.sencha.com/forum/showthread.php?286368-Parse.com-API-sending-empty-object-on-delete&p=1047228#post1047228
                        if(typeOfSave === 'destroy') {
                            
                            model.setIsErased(true);
                            model.notifyStores('afterErase', model);
                        }
                    }
                    else {
                        model.reject();
                    }

                    //                    If not silent, this will generate a confirmation window
                    if (!silent) {
                        //                        In case there is an error, display the message sent from the server if a message doesn't exist already
                        if (!wasSuccessful) {
                            var message = ('message' in options && Ext.isString(options.message) && !Ext.isEmpty(options.message)) ? options.message : false;
                            if (!message) {
                                var serverResponse = (Ext.isObject(operation.getResponse()) && !Ext.isEmpty(operation.getResponse())) ? operation.getResponse() : false;
                                if (serverResponse) {
                                    // This means the operation was successful
                                    var serverResponseText = ('responseText' in serverResponse && Ext.isString(serverResponse.responseText) && !Ext.isEmpty(serverResponse.responseText)) ? serverResponse.responseText : false;
                                    if (serverResponseText) {
                                        serverResponse = Ext.decode(serverResponseText);
                                        if (Ext.isObject(serverResponse) && !Ext.isEmpty(serverResponse)) {
                                            var serverResponseError = ('error' in serverResponse && Ext.isString(serverResponse.error) && !Ext.isEmpty(serverResponse.error)) ? serverResponse.error : false;
                                            if (serverResponseError) {
                                                message = serverResponseError;
                                                options.message = message;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        var generateWindowFunction = me[generateWindowFunctionName];
                        if(Ext.isFunction(generateWindowFunction)) {
                            
                            generateWindowFunction.call(me, options);
                        }
                    }

                    //                    Fire an event for instance: destroyedgroup
                    Ext.Viewport.fireEvent((actionNameInPastTense + modelName).toLowerCase(), options);
                }
            }
        }

        return me;
    }
    //    ,
    //    This seems like its working without having to update the UI explicitly
    //    updateViewsBoundToGivenRecord: function(options) {
    //        var me = this;
    //
    //        options = Ext.isObject(options) ? options : false;
    //        if (Ext.isObject(options)) {
    //            var modelName = ('modelName' in options && Ext.isString(options.modelName)) ? options.modelName : false;
    //            var record = ('record' in options && Ext.isObject(options.record)) ? options.record : false;
    //            //            Update views that have records bound to them
    //            if ((Ext.isString(modelName) && Ext.isObject(record))) {
    //                var model = Ext.isString(modelName) ? X.model[modelName] : false;
    //                var recordId = Ext.isObject(record) ? record.getId() : false;
    //                var updateModel = model && recordId;
    //                if (updateModel) {
    //                    var allComponentsToBeQueriedForModelUpdates = Ext.ComponentQuery.query('corecontainer, corepanel, tabpanel, coreformpanel');
    //                    Ext.each(allComponentsToBeQueriedForModelUpdates, function(thisComponent) {
    //                        if ('getRecord' in thisComponent && Ext.isFunction(thisComponent.getRecord) && Ext.isObject(thisComponent.getRecord())) {
    //                            var thisRecord = thisComponent.getRecord();
    //                            var thisRecordId = thisRecord.getId();
    //                            if (thisRecord instanceof model && thisRecordId === recordId) {
    //                                thisComponent.setRecordRecursive(thisRecord);
    //                                thisComponent.updateRecordDataRecursive(thisRecord);
    //                            }
    //                        }
    //                    });
    //                }
    //            }
    //            //            When a record loads, views with stores that have that record in them must also update
    //            var store = ('store' in options && Ext.isObject(options.store)) ? options.store : false;
    //            if (store) {
    //                var allComponentsToBeQueriedForStoreUpdates = Ext.ComponentQuery.query('list, dataview');
    //                Ext.each(allComponentsToBeQueriedForStoreUpdates, function(thisComponent) {
    //                    if ('getStore' in thisComponent && Ext.isFunction(thisComponent.getStore) && Ext.isObject(thisComponent.getStore()) && 'refresh' in thisComponent && Ext.isFunction(thisComponent.refresh) && thisComponent.getStore() === store) {
    //                        thisComponent.refresh();
    //                    }
    //                });
    //            }
    //        }
    //
    //        return me;
    //    }
});
