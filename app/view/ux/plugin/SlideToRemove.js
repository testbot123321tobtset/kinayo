Ext.define('X.view.ux.plugin.SlideToRemove', {
    extend: 'Ext.Component',
    requires: [
        'Ext.Anim'
    ],
    alias: 'plugin.slidetoremove',
    config: {
        list: null,
        removeText: 'Delete',
        buttonWidth: '25%'
    },
    init: function(list) {
        this.setList(list);
        list.on({
            itemswipe: this.showDelete,
            itemtouchstart: this.checkDeletes,
            hide: this.closeDeletes,
            scope: this
        });
    },
    showDelete: function(view, index, target, rec, e) {
        var element = (!target.dom ? target.innerElement : target);
        if (e.direction === 'left' && element.down('.x-list-item-remove') === null) {
            Ext.DomHelper.append(element, '<div class="x-list-delete-comp"></div>');
            var button = this.createButton(element, rec);
            button.show(X.config.Config.getSHOW_ANIMATION_SLIDE_TO_LEFT_CONFIG());
        } else if (e.direction === 'right' && element.down('.x-list-item-remove')) {
            this.hideDelete(element.down('.x-list-item-remove'));
        }
    },
    hideDelete: function(n) {
        Ext.Anim.run(Ext.get(n), 'slide', {
            out: true,
            easing: X.config.Config.getDEFAULT_ANIMATION_EASING(),
            duration: X.config.Config.getDEFAULT_ANIMATION_DURATION() - 300,
            autoClear: false,
            direction: 'right',
            after: function(el) {
                var parentEl = el.up('.x-list-delete-comp');
                Ext.getCmp(el.getId()).
                        destroy();
                parentEl.destroy();
            }
        });
    },
    closeDeletes: function(view) {
        Ext.DomQuery.select('div[class*=x-list-delete]', view.element.dom).
                forEach(function(node) {
                    node.parentNode.style.removeProperty('-webkit-transform');
                    node.parentNode.removeChild(node);
                });
    },
    checkDeletes: function(view, index, target, rec, e) {
        if (Ext.get(e.target).
                hasCls('x-button')) {
            view.suspendEvents();
        }
    },
    createButton: function(element, record) {
        return Ext.create('Ext.Button', {
            ui: 'decline',
            cls: 'x-list-item-remove',
            text: this.getRemoveText(),
            height: parseInt(element.getStyle('min-height')),
            bottom: ((element.getHeight() - parseInt(element.getStyle('min-height'))) / 2),
            right: 0,
            hidden: true,
            showAnimation: X.config.Config.getSHOW_ANIMATION_SLIDE_TO_LEFT_CONFIG(),
            hideAnimation: X.config.Config.getHIDE_ANIMATION_SLIDE_TO_RIGHT_CONFIG(),
            renderTo: element.down('.x-list-delete-comp'),
            handler: function(btn, e) {
                e.preventDefault();
                e.stopPropagation();
                this.getList().
                        getStore().
                        remove(record);
                Ext.Function.createDelayed(function() {
                    this.getList().
                            resumeEvents(false);
                    btn.hide();
                }, 350, this)();
            },
            scope: this
        });
    }
});