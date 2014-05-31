var _ = require('underscore');

//https://www.parse.com/docs/cloud_code_guide#functions-onsave
//
//In general, two arguments will be passed into cloud functions:
//1. request - The request object contains information about the request. The following fields are set:
//      params - The parameters object sent to the function by the client.
//      user - The Parse.User that is making the request. This will not be set if there was no logged-in user.
//2. response - The response object contains two functions:
//      success - This function takes an optional parameter which is the data to send back to the client. This object can be any JSON object/array and can contain a Parse.Object.
//      error - If called, signals that there was an error. It takes an optional parameter which will be passed to the client to provide a helpful error message.

//http://parse.com/docs/js/symbols/Parse.Cloud.html#.beforeSave
//http://parse.com/docs/js/symbols/Parse.Cloud.BeforeSaveRequest.html
//http://parse.com/docs/js/symbols/Parse.Cloud.BeforeSaveResponse.html
//https://www.parse.com/questions/difference-between-existed-and-isnew

//Use this for the following validations:
//1. Creates and updates always need a user in session
//2. validate title field
Parse.Cloud.beforeSave('Group', function(request, response) {
    
    var creator = request.user;
    if(!_.isObject(creator)) {
        response.error('creator is not specified');
    }
    else {
        var group = request.object;
        var isCreate = group.isNew();
        
//        Group is being created
        if(isCreate) {
            if (!_.isString(group.get('title'))) {
                response.error('group title is required');
            }
            else {
                group.set('createdById', creator.id);
                response.success();
            }
        }
//        Group is being updated
        else {
            response.success();
        }
    }
});

//Use this to create relationships after create (not update) 
Parse.Cloud.afterSave('Group', function(request) {
    
    var creator = request.user;
    var group = request.object;
    var wasGroupCreated = !group.existed();
    
//    This means that the group was just created and so we need to add the 
//    corresponding relations to the creator
    if(wasGroupCreated) {
    
        creator.addUnique('hasCreated', group);
        creator.addUnique('isMemberOf', group);

//        Save the creator
        creator.save();
    }
});