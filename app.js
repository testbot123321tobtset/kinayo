/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running 'sencha app upgrade'.
 
 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a 'merge conflict' that you
 will need to resolve manually.
 */

/*
 * Each Application can define a launch function, which is called as soon as 
 * all of your app's classes have been loaded and the app is ready to launch. 
 * This is usually the best place to place any app startup logic, 
 * typically creating the main view structure for your app.
 * 
 * In addition to the Application launch function, there are two other places 
 * where you can place app startup logic. First, each Controller is able to 
 * define an init function, which is called before the Application launch 
 * function. Second, if you are using Device Profiles, each Profile can 
 * define a launch function, which is called after the Controller init 
 * functions, but before the Application launch function.
 * 
 * Note Only the active Profile has its launch function called - for example 
 * if you define profiles for Phone and Tablet and then launch the app on a 
 * tablet, only the Tablet Profile's launch function is called.
 * 
 * The launch order is:
 * 
 * Controller#init functions called
 * Profile#launch function called
 * Application#launch function called
 * Controller#launch functions called
 * 
 * When using Profiles, it is common to place most of the bootup logic 
 * inside the Profile launch function, because each Profile has a different 
 * set of views that need to be constructed at startup.
 */

/*
 * All available iconCls for Buttons
 @include icon('calendar');
 @include icon('action');
 @include icon('add');
 @include icon('arrow_down');
 @include icon('arrow_left');
 @include icon('arrow_right');
 @include icon('arrow_up');
 @include icon('compose');
 @include icon('delete');
 @include icon('organize');
 @include icon('refresh');
 @include icon('reply');
 @include icon('search');
 @include icon('settings');
 @include icon('star');
 @include icon('trash');
 @include icon('maps');
 @include icon('locate');
 @include icon('home');
 @include icon('bookmarks');
 @include icon('download');
 @include icon('favorites');
 @include icon('info');
 @include icon('more');
 @include icon('time');
 @include icon('user');
 @include icon('team');
 */

/*
 * Boot up sequence
 * 
 * X.controller.Preflight.init()             Preflight.js
 * X.controller.Main.init()                  Main.js
 * X.controller.Boot.init()                  Boot.js
 * X.controller.Users.init()                 Users.js
 * X.controller.Groups.init()                Groups.js
 * X.controller.Messages.init()              Messages.js
 * Ext.application.launch()                  app.js
 * X.controller.Preflight.launch()           Preflight.js
 * X.controller.phone.Main.launch()          Main.js
 * X.controller.Boot.launch()                Boot.js
 * X.controller.Users.launch()               Users.js
 * X.controller.Groups.launch()              Groups.js
 * X.controller.Messages.launch()            Messages.js
 * X.controller.Boot.onNoBookmarkFound()
 */

Ext.application({
    name: 'X',
    profiles: [
        'Phone'
    ],
    requires: [
        'X.config.Config',
        'X.config.DummyData',
        'Ext.MessageBox',
        'Ext.device.Notification',
        'overrides.TabPanel',
        'overrides.TitleBar',
        'overrides.Toolbar',
        'overrides.Component',
        'overrides.dataview.List',
        'overrides.LoadMask',
        'overrides.form.Panel'
    ],
    models: [
        'ParseSession',
        'User',
        'AuthenticatedUser',
        'Friend',
        'Group',
        'Message',
        'DeviceContact'
    ],
    stores: [
        'ParseSession',
        'Users',
        'AuthenticatedUser',
        'Friends',
        'Groups',
        'DeviceContacts'
    ],
    controllers: [
        'Preflight',
        'phone.Main',
        'Boot',
        'Users',
        'Groups',
        'Messages'
    ],
    views: [
        'plugandplay.LoadingContainer',
        'core.Msg',
        'page.user.Root'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    launch: function() {
        // Easy access to config object
        X.XConfig = X.config.Config;
        if (X.XConfig.getDEBUG() && X.XConfig.getBOOTUP_DEBUG()) {
            console.log('Debug: Ext.application.launch(): ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
    }
});
