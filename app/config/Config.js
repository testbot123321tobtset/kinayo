Ext.define('X.config.Config', {
    singleton: true,
    config: {
//        Parse config
//        Here is a post on Parse's authentication mechanism: http://stackoverflow.com/questions/23820720/parse-com-rest-api-authentication/23823688?noredirect=1#23823688
//        Implementing identifying users and finding friends using phone numbers:
//        http://stackoverflow.com/questions/21414102/how-to-send-the-parse-users-objectid-with-the-twilio-module,
//        https://www.twilio.com/docs/api/rest/sending-messages
//        Basically, here are the steps:
//        1. We ask user to enter his/her phone number (App Store guidelines say we cannot read the phone number from a device,
//              it also says that we can't make emails mandatory – meaning that authentication by email is out of the window,
//              we can't have authenticate only by usernames because 1. it will definitely increase spam, 2. it'll be a pain point
//              to search for a username when you are looking to add people – basically, we don't want people to anything extra to
//              see thair network; when they sign in, they should already have their social network ready)
//        2. We write Cloud Code in Parse as shown here: http://stackoverflow.com/questions/21414102/how-to-send-the-parse-users-objectid-with-the-twilio-module
//              to connect to Twilio and send a message to the phone number that the user just entered
//        3. This message will have the objectId of the user that Parse will have created
//        4. User then needs to enter that code somewhere in our App's UI
//        5. We then check the database to see if the objectId matched up against the phone number
//        6. If it did, we mark that user as verified      
//        When we combine this with the fact that Parse's REST API doe not ever expire the session token (which any REST API really shouldn't),
//        we now have an app that is "always-on" just like WhatsApp, which also doesn't have a log out option (there is a change number option, which
//        makes sense, and we should implement it as well)
        PARSE: {
            ENDPOINT: 'https://api.parse.com/1/',
            APPLICATION_ID: 'nkWyH9Ki10gdvhlMeqKIGPTsyRRBheZLArziuT7h',
            REST_API_KEY: 'UV4PNVb31nvjKX6eyOtQTQmxKUfnEK2ZPPL9Tqsv',
//            https://www.parse.com/docs/rest#users-signup
            SIGNUP: {
                ENDPOINT: 'users',
                METHOD: 'POST'
            },
//            https://www.parse.com/docs/rest#users-login
            LOGIN: {
                ENDPOINT: 'login',
                METHOD: 'GET'
            },
//            https://www.parse.com/docs/rest#users
            USERS: {
                ENDPOINT: 'users'
            },
//            https://www.parse.com/docs/rest#users-validating
            ME: {
                ENDPOINT: 'users/me'
            },
            GROUPS: {
                ENDPOINT: 'classes/Group'
            }
        },
        
        // TO DO: Update these URLs when you have the UIs
        DEFAULT_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_SIGNUP_PAGE: 'user/signup',
        DEFAULT_USER_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_LOGOUT_PAGE: 'user/logout',
        DEFAULT_USER_PAGE: 'user/profile/groups/feeds',
        MESSAGES: {
            // Bad news
            ALERT: 'Something seems to be wrong!',
            CONFIRM: 'We need your permission',
            INVALID_LOGIN: 'Hmm, we couldn\'t log you in. Email us if the problem persists.',
            FAILED_AUTHENTICATION: 'Hmm, we couldn\'t find you in our system. Email us if the problem persists.',
            FAILED_SAVE: 'The data you requested could not be saved. Let us know if the problem persists.',
            REPORT_BUG: 'Email Us',
            FREE_CLUB_LABEL: 'This club is free for all to join!',
            FREE_CLUB_POINTS: 'Free',
            NO_BRAND_WAS_FOUND_TO_LOAD_PROFILE: 'We are sorry, but we couldn\'t find a brand to load it\'s profile. Are you sure you have the correct URL? If you are a registered brand yourself, then try logging in first. If you continue to face problems, please email us and let us know.',
            INVALID_BRAND_FOUND_IN_URL_TO_LOAD_PROFILE: 'We are sorry, but we couldn\'t find the brand referenced in the URL. Are you sure you have the correct URL? If you are sure you have the correct URL but continue to face problems, please email us the offending URL.',
            STATE_FAILURE_DEFAULT_MESSAGE: 'We are sorry, but we may have just run into a rather nasty problem. Try navigating away from this page using the controls in the bottom menu bar. If that doesn\'t work please try refreshing the page. If you were in the middle of something and didn\'t have a chance to save your work, you will have to re-do it after you refresh the page. If you continue to face problems, please email us and let us know.',
            
            // Good news
            SUCCESS: 'It worked!',
            SAVE_SUCCESSFUL: 'Your changes were successfully saved.',
            
            // Message box title
            MESSAGE_BOX_CONFIRM_TITLE: 'Just making sure',
            
            USER_SUCCESSFULLY_LOGGED_IN: 'This user was successfully logged in.', 
            
            MODEL_SUCCESSFULLY_CREATED: 'This model was successfully created.',
            MODEL_SUCCESSFULLY_UPDATED: 'This model was successfully updated.',
            MODEL_SUCCESSFULLY_DESTROYED: 'This model was successfully destroyed.',
            USER_SUCCESSFULLY_CREATED: 'This user was successfully created.',
            USER_SUCCESSFULLY_UPDATED: 'This user was successfully updated.',
            USER_SUCCESSFULLY_DESTROYED: 'This user was successfully destroyed.',
            GROUP_SUCCESSFULLY_CREATED: 'This group was successfully created.',
            GROUP_FAILED_CREATED: 'This group could not be created.',
            GROUP_SUCCESSFULLY_UPDATED: 'This group was successfully updated.',
            GROUP_FAILED_UPDATED: 'This group failed to update.',
            GROUP_SUCCESSFULLY_DESTROYED: 'This group was successfully destroyed.',
            
            FRIENDSHIP_SUCCESSFULLY_CREATED: 'This friendship was successfully created.',
            
            DEVICE_CONTACTS_ACCESS_REQUEST: 'Giving us access to your device\'s address book will help us automatically find all ' +
                    'your friends whom you can start sharing with right away.<br /><br />We promise we will not contact them on your behalf or otherwise bug you ' +
                    'guys in any way!<br /><br />Do you want to go ahead with it?',
        
            PHONE_NUMBER_REQUIRED: 'Your device\'s phone number is required to proceed.'
        },
        CUSTOMER_SERVICE_EMAIL_ADDRESS: 'test@test.com',
        DEBUG: true,
        BOOTUP_DEBUG: false,
        DETAILED_DEBUG: false,
        
        // UI
        EAGERGENERATECOMPONENTS: [
            //            'usergroupcontainer',
            //            'usergroupeditcontainer'
        ],
        // Z indices
        ZINDEX_LEVEL_5: 50,
        ZINDEX_LEVEL_4: 49,
        ZINDEX_LEVEL_3: 48,
        ZINDEX_LEVEL_2: 47,
        ZINDEX_LEVEL_1: 46,
        // Should depth be represented by offset either vertically or horizontally
        LAYER_DEPTH_BASED_ON_OFFSET: false,
        // Every new window-like floating container will reduce in dimensions by this much pixels
        LAYER_HORIZONTAL_OFFSET: 0,
        LAYER_VERTICAL_OFFSET: 0,
        // Animations
        // When you change animations, check overrides.TitleBar for consistency
        // Animation types: 'fade', 'fadeOut', 'flip', 'pop', 'popOut', 'slide', 'slideOut' (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.fx.Animation-cfg-type)
        DEFAULT_ANIMATION_DURATION: 200,
        // Easing types: 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out' (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Anim-cfg-easing)
        DEFAULT_ANIMATION_EASING: 'cubic-bezier(0,.23,0,1)',
        ANIMATION_CONFIG: {
            type: 'slide',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        SHOW_ANIMATION_WITH_NO_DIRECTION_CONFIG: {
            type: 'slide',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        HIDE_ANIMATION_WITH_NO_DIRECTION_CONFIG: {
            type: 'slideOut',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        SHOW_ANIMATION_CONFIG: {
            type: 'pop',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        SHOW_ANIMATION_FROM_UP_CONFIG: {
            type: 'slide',
            direction: 'down',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        SHOW_ANIMATION_FROM_DOWN_CONFIG: {
            type: 'slide',
            direction: 'up',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        HIDE_ANIMATION_CONFIG: {
            type: 'popOut',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 400
        },
        HIDE_ANIMATION_FROM_DOWN_CONFIG: {
            type: 'slideOut',
            direction: 'up',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        HIDE_ANIMATION_FROM_DOWN_SLOW_AT_FIRST_CONFIG: {
            type: 'slideOut',
            direction: 'up',
            easing: 'cubic-bezier(.7,0,.7,1)',
            duration: 200
        },
        HIDE_ANIMATION_FROM_UP_SLOW_AT_FIRST_CONFIG: {
            type: 'slideOut',
            direction: 'down',
            easing: 'cubic-bezier(.7,0,.7,1)',
            duration: 200
        },
        SHOW_BY_POP_ANIMATION_CONFIG: {
            type: 'pop',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 200
        },
        HIDE_BY_POP_ANIMATION_CONFIG: {
            type: 'popOut',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 400
        },
        
        // Phonegap
        // Contact (http://docs.phonegap.com/en/3.3.0/cordova_contacts_contacts.md.html#Contacts)
        PG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT: [
            //            'emails'
            'phoneNumbers'
        ],
        PG_READ_DEVICE_CONTACT_FIELDS: [
            'id', 'displayName', 'name', 'nickname', 'phoneNumbers', 'emails', 'photos'
        ],
//        https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md
        PG_CAMERA: {
            ENCODING_TYPE: 0,
            PICTURE_SOURCE_TYPE: 1,
            DESTINATION_TYPE: 1,
            MEDIA_TYPE: 2
        },
        
//        Messaging
        TEXT_MESSAGE_MAXIMUM_CHARACTERS: 140,
        TEXT_MESSAGE_MAXIMUM_CHARACTERS_MESSAGE_POSTFIX: ' characters left',
        TEXT_MESSAGE_PLACEHOLDER: 'Hoho',
        
//        Labels
        LABELS: {
            SELECT_FRIENDS_TO_ADD_TO_GROUP: 'Choose friends to add',
            SEE_FRIENDS_IN_THE_GROUP: 'Members'
        }
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
