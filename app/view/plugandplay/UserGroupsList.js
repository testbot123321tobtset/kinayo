Ext.define('X.view.plugandplay.UserGroupsList', {
    extend: 'Ext.dataview.List',
    xtype: 'usergroupslist',
    config: {
        itemId: 'userGroupsList',
        cls: 'user-groups-list',
        itemTpl: '{title}',
        deselectOnContainerClick: true,
        onItemDisclosure: true,
        preventSelectionOnDisclose: false,
        
        deferEmptyText: false
    },
    onInitialize: function(me) {
        
        //        Set empty text
        me.setEmptyText(X.config.Config.getMESSAGES().NO_GROUPS_FOUND);
    }
});
