define([
    'views/widgets/Panel',

    'backbone',
    'lodash',
    '../../../development-bundle/ui/jquery-ui.custom'
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

        initialize: function (options) {
            this.zIndexManager = options.zIndexManager;
            this.zIndexManager.register(this, {
                activate: options.model.get('active')
            });

            var parent =  this.constructor.__super__;
            parent.initialize.apply(this, options);
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

        minimize: function(evt) {
            console.log('minimize');
        },

        toggleMaximize: function(evt) {
            debugger;
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
        },

        _hideRestoreBtn: function () {
            this.header.$('.restore-btn').parent().hide();
            this.header.$('.maximize-btn').parent().show();
        },

        _hideMaximizeBtn: function () {
            this.header.$('.maximize-btn').parent().hide();
            this.header.$('.restore-btn').parent().show();
        }
        
    });

});
