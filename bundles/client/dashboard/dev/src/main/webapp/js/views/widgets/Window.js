define([
    'views/widgets/Panel',
    'jquery',
    'backbone',
    'lodash',
    '../../../development-bundle/ui/jquery-ui.custom'
], function (Panel, $, Backbone, _) {
    
    'use strict';

    return Panel.extend({

        model: null,
        className: 'widget window',

        initialize: function (options) {
            this.zIndexManager = options.zIndexManager;
            this.zIndexManager.register(this, {
                activate: options.model.get('active')
            });

            var parent =  this.constructor.__super__;
            parent.initialize.apply(this, options);
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
                            stop: me._unmask
                        })
                        .trigger(evt);
                })
                .resizable({
                    minHeight: 50,
                    minWidth: 50,
                    start: me._mask,
                    resize: me._onResize,
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
            if (this.model.get('active')) this.zIndexManager.bringToFront(this);
        },

        attributes: function() {
            var model = this.model;
            return {
                'style':    'left:' + model.get('x') + 'px;' +
                            'top:' + model.get('y') + 'px;' + 
                            'width:' + model.get('width') + 'px;' +
                            'height:' + model.get('height') + 'px;' + 
                            'z-index:' + model.get('zIndex') + ';'
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
        }

    });

});
