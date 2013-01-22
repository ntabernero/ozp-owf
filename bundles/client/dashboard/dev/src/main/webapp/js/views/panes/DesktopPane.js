define([
    'views/panes/Pane',
    'views/widgets/Window',
    'views/Taskbar',
    'jquery',
    'backbone'
], function (Pane, WidgetWindow, $, Backbone) {
    
    'use strict';

    return Pane.extend({

        model: null,

        className: 'pane desktoppane',

        render: function () {
            var me = this,
                fragment = $(document.createDocumentFragment());

            console.time('pane');
            this.constructor.__super__.render.call(this);

            this.renderTaskbar();


            this.$el.append(fragment);

            console.timeEnd('pane');
            return this;
        },

        renderTaskbar: function() {
            var taskbar = new Taskbar({
                widgets: this.widgets
            });

            this.$el.append(taskbar.$el);
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
                containment: this.$el
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
