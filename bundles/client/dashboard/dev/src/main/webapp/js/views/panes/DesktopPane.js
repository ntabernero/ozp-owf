define([
    'views/panes/Pane',
    'views/widgets/Window',
    'views/Taskbar',
    'services/ZIndexManager',
    'jquery',
    'backbone'
], function (Pane, WidgetWindow, Taskbar, ZIndexManager, $, Backbone) {
    
    'use strict';

    return Pane.extend({

        model: null,
   
        
        $body: null, //jquery element for the dashboard body
        taskbar: null, //taskbar View

        className: 'pane desktoppane',

        initialize: function() {
            Pane.prototype.initialize.apply(this, arguments);

            this.windows = [];

            this.zIndexManager = new ZIndexManager();
        },

        render: function () {
            var me = this;

            console.time('pane');
            this.constructor.__super__.render.call(this);

            this.renderBody();
            this.renderTaskbar();
            this.$body.append(this.renderWidgets());

            console.timeEnd('pane');
            return this;
        },

        renderBody: function() {
            this.$body = $(document.createElement('div')).addClass('body');
            this.$el.append(this.$body);
        },

        renderTaskbar: function() {
            this.taskbar = new Taskbar({
                collection: this.widgets
            });

            this.taskbar.render();
            this.$el.append(this.taskbar.$el);
        },

        /**
         * Creates a DocumentFragment containing rendered widgets
         * @return the document fragment
         */
        renderWidgets: function() {
            var fragment = $(document.createDocumentFragment()),
                me = this;

            this.widgets.each(function (widgetState) {
                fragment.append(me.renderWidget(widgetState).$el);
            });

            return fragment;
        },

        renderWidget: function(widgetState) {
            console.time('widget');
        
            var ww = new WidgetWindow({
                model: widgetState,
                containment: this.$body,
                zIndexManager: this.zIndexManager
            });

            ww.render();

            console.timeEnd('widget');

            this.windows.push(ww);

            return ww;
        },

        launchWidget: function (evt, model) {
            var ww = this.renderWidget(model);
            this.$el.append(ww.$el);
            return ww;
        },

        changeActivation: function(widget) {
            var active = widget.get('active');

            if (active) {
                //deactivate all widgets first
                this.widgets.each(function(widg) {
                    if (widget !== widg) widg.set('active', false);
                });
            }

            
        }
        
    });

});
