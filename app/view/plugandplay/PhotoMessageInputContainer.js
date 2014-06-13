// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.PhotoMessageInputContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'Ext.Img',
        'X.view.plugandplay.MessageFormPanel'
    ],
    xtype: 'photomessageinputcontainer',
    id: 'photoMessageInputContainer',
    config: {
        // isWindow config just means what is explained in the beginning
        // This is an easy way to query for any and all windows and do
        // further processing with them. Usually this is used to hide all
        // of such windows
        isWindow: true,
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'photo-message-input-container',
        floating: true,
        centered: true,
        fullscreen: true,
        modal: true,
        hidden: true,
        items: [
            {
                xtype: 'image',
                itemId: 'photoToBePosted',
                cls: 'photo-to-be-posted',
                flex: 1,
                mode: false,
                src: 'http://placehold.it/100x200',
                listeners: {
                    painted: function(me) {
                        var mySize = me.getSize(),
                                myHeight = mySize.height,
                                myWidth = mySize.width;

                        var imgDom = me.down('img'),
                                imgDomHeight = imgDom.dom.naturalHeight,
                                imgDomWidth = imgDom.dom.naturalWidth,
                                imgDomHeightToWidth = imgDomHeight/imgDomWidth;
                        
                        if (imgDomHeight > myHeight) {
                            imgDomHeight = 0.9 * myHeight;
                            imgDomWidth = imgDomHeight/imgDomHeightToWidth;
                        }
                        if (imgDomWidth > myWidth) {
                            imgDomWidth = 0.9 * myWidth;
                        }
                        
                        imgDom.setHeight(imgDomHeight);
                        imgDom.setWidth(imgDomWidth);
                        
                        imgDom.setStyle('margin-top', (myHeight - imgDomHeight)/2 + 'px');
                        imgDom.setStyle('margin-left', (myWidth - imgDomWidth)/2 + 'px');
                    }
                }
            },
            {
                xtype: 'messageformpanel',
                flex: 1,
                scrollable: true
            },
            {
                xtype: 'tabbar',
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    {
                        itemId: 'postMessage',
                        cls: 'messagebox-button',
                        iconCls: 'checkmark',
                        title: 'Post',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#photoMessageInputContainer').onPostMessage();
                            }
                        }
                    },
                    {
                        itemId: 'cancelMessage',
                        cls: 'messagebox-button',
                        iconCls: 'close',
                        title: 'Cancel',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#photoMessageInputContainer').onCancelMessage();
                            }
                        }
                    }
                ]
            }
        ]
    },
    onPostMessage: function() {
        var me = this;
        me.close();
        return me;
    },
    onCancelMessage: function() {
        var me = this;
        me.close();
        return me;
    },
    setImageUsingBase64Data: function(imageData) {
        var me = this;
        if (!Ext.isEmpty(imageData)) {
            me.down('image').
                    setSrc('data:image/jpeg;base64,' + imageData);
        }
        return me;
    },
    setImageUsingFileUrl: function(imageFileUrl) {
        var me = this;
        if (Ext.isString(imageFileUrl)) {
            me.down('image').
                    setSrc(imageFileUrl);

        }
        return me;
    }
});