Ext.define('X.view.plugandplay.MessageFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.Label'
    ],
    xtype: 'messageformpanel',
    config: {
        itemId: 'messageFormPanel',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'message-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'messageFormFieldSet',
                cls: 'message-form-fieldset',
                items: [
                    {
                        xtype: 'textareafield',
                        itemId: 'messageTextareaField',
                        cls: 'message-textarea-field',
                        flex: 1,
                        maxLength: X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS(),
                        placeHolder: X.config.Config.getTEXT_MESSAGE_PLACEHOLDER(),
                        listeners: {
                            keyup: function(button, e, eOpts) {
                                button.up('#messageFormPanel').onMessageTextareaFieldKeyup(button, e, eOpts);
                            },
                            change: function(button, e, eOpts) {
                                button.up('#messageFormPanel').onMessageTextareaFieldChange(button, e, eOpts);
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        itemId: 'messageTextareaMaximumCharactersLeftLabel',
                        cls: 'message-textarea-maximum-characters-left-label',
                        html: X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS() + X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS_MESSAGE_POSTFIX(),
                        flex: 1
                    }
                ]
            }
        ]
    },
    onMessageTextareaFieldKeyup: function(field, e, eOpts) {
        var me = this;
        me.updateMaximumCharactersLeftLabel(field, e, eOpts);
        return me;
    },
    onMessageTextareaFieldChange: function(field, e, eOpts) {
        var me = this;
        me.updateMaximumCharactersLeftLabel(field, e, eOpts);
        return me;
    },
    updateMaximumCharactersLeftLabel: function(field, e, eOpts) {
        var me = this;
        me.down('#messageTextareaMaximumCharactersLeftLabel').setHtml(X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS() - field.getValue().length + X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS_MESSAGE_POSTFIX());
        return me;
    }
});