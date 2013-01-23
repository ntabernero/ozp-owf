define([
    'views/panes/Pane',
    'views/widgets/Window',
    'views/Taskbar',
    'jquery',
    'backbone'
], function (Pane, WidgetWindow, Taskbar, $, Backbone) {
    
    'use strict';

    return Pane.extend({

        model: null,
    
        
        $body: null, //jquery element for the dashboard body
        taskbar: null, //taskbar View

        className: 'pane desktoppane',

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
                widgets: this.widgets
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
                containment: this.$body
            });

            ww.render();

            console.timeEnd('widget');

            return ww;
        },

        launchWidget: function (evt, model) {
            var ww = this.renderWidget(model);
            this.$el.append(ww.$el);
            return ww;
        }
        
    });

});
