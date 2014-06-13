var _ = require('underscore');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

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
    if (!_.isObject(creator)) {
        response.error('creator is not specified');
    }
    else {
        var group = request.object;
        var isCreate = group.isNew();

        //        Group is being created
        if (isCreate) {
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
    if (wasGroupCreated) {

        creator.addUnique('hasCreated', group);
        creator.addUnique('isMemberOf', group);

        //        Save the creator
        creator.save();
    }
});

//Use this to destroy references of this group from other tables such as _User
Parse.Cloud.afterDelete('Group', function(request) {

    var creator = request.user;
    var group = request.object;
    
    creator.remove('hasCreated', group);
    creator.remove('isMemberOf', group);
    
    creator.save();
});

/*
 * Custom functions
 */
Parse.Cloud.define("setFriendsForPhoneNumbers", function(request, response) {
    
    var me = request.user;
    if (_.isObject(me)) {
        
        var params = request.params;
        if (_.isObject(params) && !_.isEmpty(params)) {
            
            var phoneNumbers = params.phoneNumbers;
            phoneNumbers = phoneNumbers.split(',');
            if (_.isArray(phoneNumbers) && !_.isEmpty(phoneNumbers)) {
        
                var currentIsFriendsWithFieldValue = me.get('isFriendsWith');
                
                console.log('*********');
                console.log(me.get('isFriendsWith'));
                
                me.set('isFriendsWith', [
                ]);
                
                console.log('*********');
                console.log(me.get('isFriendsWith'));
                
                var query = new Parse.Query(Parse.User);
                
                //                Exclude myself from this query: I can't be my own friend...I mean...that'd be sad right?
                query.notEqualTo('phoneNumber', me.get('phoneNumber'));
                query.find({
                    success: function(usersWithPhoneNumber) {
                        
                        _.each(usersWithPhoneNumber, function(thisUser) {
                                
                            var thisUsersPhoneNumber = thisUser.get('phoneNumber');
                            thisUsersPhoneNumber = _.isNumber(thisUsersPhoneNumber) ? thisUsersPhoneNumber.toString() : false;
                            if(thisUsersPhoneNumber) {
                                
                                thisUsersPhoneNumber = (_.isString(thisUsersPhoneNumber) && thisUsersPhoneNumber.length > 0) ? thisUsersPhoneNumber : false;
                                if (thisUsersPhoneNumber) {
                                    
                                    var thisUsersPhoneNumberIsInRequestedListOfPhoneNumbers = _.find(phoneNumbers, function(thisPhoneNumber) {
                                        //                    Don't use === operator: we make users enter 13232173548 instead of
                                        //                    3232173548 i.e. with the country code, and I don't yet know of a good way
                                        //                    to normalize the phone numbers. But, maybe we don't have to once we start using Twilio's
                                        //                    API for phone number authentication – Twilio might normalize the number for us, but I'm not sure 
                                        //                    For now, use the endsWith operator, because the phone numbers returned by Phonegap are in the format
                                        //                    that the user has entered the contact in her contacts application on her phone, and this format
                                        //                    might not have the country code. endsWith is a hack – we need to find a way to normalize the phone
                                        //                    numbers. TODO
                                        return thisUsersPhoneNumber.endsWith(thisPhoneNumber);
                                    });
                                    if (thisUsersPhoneNumberIsInRequestedListOfPhoneNumbers) {
                                        
                                        me.addUnique('isFriendsWith', thisUser);
                                    }
                                }
                            }
                        });
                        
                        me.save(null, {
                            success: function(theUpdatedMe) {

                                response.success(theUpdatedMe);
                            },
                            error: function(error) {

                                response.error(error.message);
                            }
                        });
                    },
                    error: function(error) {
                        
                        response.error(error.message);
                    }
                });
                
                console.log('*********');
                console.log(me.get('isFriendsWith'));
            }
            else {

                response.error('param for phone numbers not found');
            }
        }
        else {
            
            response.error('params not found');
        }
    }
    else {
        
        response.error('requester is not specified');
    }
});