define([
    'views/widgets/Panel',

    'backbone',
    'lodash'
], function (Panel, Backbone, _) {
    
    'use strict';

    return Panel.extend({

        model: null,
        className: 'widget window',
        events: {
            'click .minimize-btn' : 'minimize',
            'click .maximize-btn' : 'toggleMaximize',
            'click .restore-btn' : 'toggleMaximize',
            'dblclick': 'toggleMaximize'
        },

        initialize: function () {
            var parent =  this.constructor.__super__;
            parent.initialize.call(this);
            this.events = _.extend({}, parent.events, this.events);
        },

        render: function() {
            var me = this;

            me.constructor.__super__.render.call(me);

            me.$el
                .one('mousedown', function (evt) {
                    me.$el
                        .draggable({
                            containment: me.containment,
                            start: me._onDragStart,
                            stop: me._onDragStop
                        })
                        .trigger(evt);
                })
                .resizable({
                    start: me._onResizeStart,
                    resize: me._onResize,
                    stop: me._onResizeStop
                });

            return me;
        },

        minimize: function(evt) {
            console.log('minimize');
        },

        toggleMaximize: function(evt) {
            var container = this.options.containment,
                offset = container.offset(),
                $el = this.$el,
                $target = $(evt.target),
                $currentTarget = $(evt.currentTarget);

            if(this.maximized) {
                this._restoreBox && $el.css(this._restoreBox);
                this._hideRestoreBtn();

                delete this._restoreBox;
            }
            else {
                this._restoreBox = this.getBox();

                this.$el.css({
                    width: container.width(),
                    height: container.height(),
                    top: '0px',
                    left: '0px'
                });
                this._hideMaximizeBtn();
            }

            this.maximized = !this.maximized;
        },

        _onDragStart: function (evt, ui) {
        },

        _onDragStop: function (evt, ui) {
        },

        _onResizeStart: function (evt, ui) {
        },

        _onResize: function (evt, ui) {
        },

        _onResizeStop: function (evt, ui) {
        },

        _hideRestoreBtn: function () {
            this.header.$('.restore-btn').parent().hide();
            this.header.$('.maximize-btn').parent().show();
        },

        _hideMaximizeBtn: function () {
            this.header.$('.maximize-btn').parent().hide();
            this.header.$('.restore-btn').parent().show();
        },
        
    });

});