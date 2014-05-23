Ext.define('X.view.ux.ToggleableButton', {
    extend: "Ext.Button",
    xtype: 'togglebutton',
    config: {
        isPressed: false
    },
    initialize: function() {
        this.callParent(arguments);
        this.on("tap", this.onButtonPress, this);
        this.getIsPressed() ? this.addCls(this.getPressedCls()) : this.removeCls(this.getPressedCls());
    },
    onButtonPress: function() {
        this.setIsPressed(!this.getIsPressed());
        this.getIsPressed() ? this.addCls(this.getPressedCls()) : this.removeCls(this.getPressedCls());
    }

});