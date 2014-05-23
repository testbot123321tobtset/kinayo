Ext.define('X.view.plugandplay.UsersList', {
    extend: 'Ext.dataview.List',
    xtype: 'userslist',
    config: {
        itemId: 'usersList',
        cls: 'users-list',
        itemTpl: '{formattedName}',
        onItemDisclosure: true,
        infinite: true,
        grouped: true,
        mode: 'MULTI'
    },
    setReadOnly: function(isReadOnly) {
        var me = this;

        isReadOnly = Ext.isBoolean(isReadOnly) ? isReadOnly : true;
        me.setDisableSelection(isReadOnly);
        me.setOnItemDisclosure(!isReadOnly);
//        var disclosures = me.element.query('.x-list-disclosure');
//        var noOfDisclosures = disclosures.length;
//        var disclosureIndex = 0;
//        for (; disclosureIndex < noOfDisclosures; disclosureIndex++) {
//            disclosures[disclosureIndex].style.display = 'none'; // or disclosures[disclosureIndex].style.display = 'block';
//        }

        return me;
    }
});
