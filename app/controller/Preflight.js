Ext.define('X.controller.Preflight', {
    extend: 'X.controller.Main',
    requires: [
        'X.view.plugandplay.LoadingContainer',
        'X.view.plugandplay.NotificationContainer',
        'X.view.plugandplay.InteractiveUsersListContainer'
    ],
    config: {
        before: {
        },
        routes: {
        },
        control: {
        },
        refs: {
        }
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log('Debug: X.controller.Preflight.init()');
        }

//        Ext.Msg customizations
//        If you want to have the window slide down from above and disappear downward, see: https://fiddle.sencha.com/#fiddle/637
//        and this: http://www.sencha.com/forum/showthread.php?285246-Ext.Msg-slide-show-and-hide-animation
        Ext.Msg.defaultAllowedConfig.width = '100%';
        Ext.Msg.defaultAllowedConfig.bottom = 0;
        Ext.Msg.defaultAllowedConfig.showAnimation = X.config.Config.getSHOW_ANIMATION_CONFIG_FOR_MESSAGEBOX();
        Ext.Msg.defaultAllowedConfig.hideAnimation = X.config.Config.getHIDE_ANIMATION_CONFIG_FOR_MESSAGEBOX();
        Ext.Msg.on('painted', function() {
            Ext.Msg.setScrollable(true);
            Ext.Msg.setZIndex(X.config.Config.getZINDEX_LEVEL_5());
        });
        
        /*
         * Singleton Initializations
         */
        
        Ext.Viewport.add(X.view.plugandplay.LoadingContainer);
        Ext.Viewport.add(X.view.plugandplay.NotificationContainer);
        Ext.Viewport.add(X.view.plugandplay.InteractiveUsersListContainer);
        Ext.Viewport.add(X.view.plugandplay.NonInteractiveUsersListContainer);
        
        //        Native array extras
        if (!Array.prototype.last) {
            Array.prototype.last = function() {
                return this[this.length - 1];
            };
        };
        
        //        Native string extras
        Ext.apply(String.prototype, (function() {
            function uc(str, p1) {
                return p1.toUpperCase();
            }
            function lc(str, p1) {
                return p1.toLowerCase();
            }
            var camelRe = /-([a-z])/g,
                    titleRe = /((?:\s|^)[a-z])/g,
                    capsRe = /^([a-z])/,
                    decapRe = /^([A-Z])/,
                    leadAndTrailWS = /^\s*([^\s]*)?\s*/,
                    result;

            return {
                leftPad: function(val, size, ch) {
                    result = String(val);
                    if (!ch) {
                        ch = " ";
                    }
                    while (result.length < size) {
                        result = ch + result;
                    }
                    return result;
                },
                camel: function(s) {
                    return this.replace(camelRe, uc);
                },
                title: function(s) {
                    return this.replace(titleRe, uc);
                },
                decapitalize: function() {
                    return this.replace(decapRe, lc);
                },
                startsWith: function(prefix) {
                    return this.substr(0, prefix.length) === prefix;
                },
                endsWith: function(suffix) {
                    var start = this.length - suffix.length;
                    return (start > -1) && (this.substr(start) === suffix);
                },
                equalsIgnoreCase: function(other) {
                    return (this.toLowerCase() === other.toLowerCase());
                },
                // Remove leading and trailing whitespace
                normalize: function() {
                    return leadAndTrailWS.exec(this)[1] || '';
                },
                
                getUrlPath: function() {
                    return this.split('?')[0];
                },
                getUrlPathInArray: function() {
                    return this.getUrlPath().split('/');
                }
            };
        })());

        // The following handles scrolling on the web – remove it when building native
        //        document.addEventListener('mousewheel', function(e) {
        //            var el = e.target;
        //            var results = [
        //            ];
        //            while (el !== document.body) {
        //                if (el && el.className && el.className.indexOf('x-container') >= 0) {
        //                    var cmp = Ext.getCmp(el.id);
        //                    if (cmp && typeof cmp.getScrollable == 'function' && cmp.getScrollable()) {
        //                        var scroller = cmp.getScrollable().
        //                                getScroller();
        //                        if (scroller) {
        //                            var offset = {
        //                                x: 0,
        //                                y: -e.wheelDelta * 0.5
        //                            };
        //                            scroller.fireEvent('scrollstart',
        //                                    scroller,
        //                                    scroller.position.x,
        //                                    scroller.position.y,
        //                                    e);
        //                            scroller.scrollBy(offset.x, offset.y);
        //                            scroller.snapToBoundary();
        //                            scroller.fireEvent('scrollend',
        //                                    scroller,
        //                                    scroller.position.x,
        //                                    scroller.position.y - offset.y);
        //                            break;
        //                        }
        //                    }
        //                }
        //                results.push(el = el.parentNode);
        //            }
        //            return results;
        //        }, false);
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log('Debug: X.controller.Preflight.launch()');
        }
    }
});
