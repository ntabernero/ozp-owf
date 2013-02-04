define([
    'views/widgets/Panel',
    'views/widgets/WindowHeader',
    'backbone',
    'lodash',
    'jqueryui/jquery-ui.custom'
], function (Panel, WindowHeader, Backbone, _, $) {
    
    'use strict';

    return Panel.extend({

        model: null,
        className: 'widget window',

        headerClass: WindowHeader,

        initialize: function (options) {
            var parent =  this.constructor.__super__;
            parent.initialize.apply(this, arguments);

            this.zIndexManager = options.zIndexManager;
            this.zIndexManager.register(this, this.model.get('zIndex'));
        },

        render: function() {
            var me = this;

            me.constructor.__super__.render.call(me);

            me.$el
                .one('mousedown', function (evt) {
                    me.$el
                        .draggable({
                            containment: me.containment,
                            start: me._mask,
                            stop: function(evt, ui) {
                                me._unmask();
                                me._onMove(evt, ui);
                            }
                        })
                        .trigger(evt);
                })
                .resizable({
                    minHeight: 50,
                    minWidth: 50,
                    start: me._mask,
                    resize: _.bind(me._onResize, me),
                    stop: me._unmask
                });

            return me;
        },

        close: function () {
            this.$el
                .draggable( 'destroy' )
                .resizable( 'destroy' );

            this.constructor.__super__.close.apply(this, arguments);
        },

        updateMinimize: function() {
            this.$el[this.model.get('minimized') ? 'addClass' : 'removeClass']('minimized');
        },

        updateMaximize: function() {
            this.$el[this.model.get('maximized') ? 'addClass' : 'removeClass']('maximized');
        },

        updateActive: function() {
            Panel.prototype.updateActive.apply(this, arguments);
            if (this.model.get('active')) {
                this.zIndexManager.bringToFront(this);
            }

            if (this.zIndexManager) {
                this.model.set('zIndex', this.zIndexManager.getLogicalIndex(this));
            }
        },

        attributes: function() {
            var model = this.model;
            return {
                'style':    'left:' + model.get('x') + 'px;' +
                            'top:' + model.get('y') + 'px;' + 
                            'width:' + model.get('width') + 'px;' +
                            'height:' + model.get('height') + 'px;'
            };
        },

        //TODO: refactor
        _mask: function () {
            $('#mask').removeClass('hide');
        },

        //TODO: refactor 
        _unmask: function () {
            $('#mask').addClass('hide');
        },

        _onResize: function (evt, ui) {
            this.model.set('height', ui.size.height);
            this.model.set('width', ui.size.width);
        },

        _onMove: function(evt, ui) {
            this.model.set('x', ui.position.left);
            this.model.set('y', ui.position.top);
        }

    });

});
