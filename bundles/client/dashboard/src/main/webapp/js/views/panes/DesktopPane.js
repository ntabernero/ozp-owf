define([
    'views/panes/LayoutPane',
    'views/widgets/Window',
    'views/Taskbar',
    'views/widgets/WindowHeader',
    'services/ZIndexManager',
    'jquery',
    'backbone'
], function (LayoutPane, WidgetWindow, Taskbar, WindowHeader, ZIndexManager, $, Backbone) {
    
    'use strict';

    return LayoutPane.extend({
        vtype: 'desktoppane',

        model: null,

        $body: null, //jquery element for the dashboard body
        taskbar: null, //taskbar View

        className: 'pane desktoppane',

        initialize: function() {
            LayoutPane.prototype.initialize.apply(this, arguments);

            this.windows = [];

            this.zIndexManager = new ZIndexManager();
        },

        render: function () {
            var me = this;

            //console.time('pane');
            this.renderTaskbar();
            this.renderWidgets();
            
            this.constructor.__super__.render.call(this);

            //console.timeEnd('pane');
            return this;
        },

        renderTaskbar: function() {
            this.taskbar = new Taskbar({
                collection: this.collection,
                HeaderClass: WindowHeader
            });

            this.taskbar.render();
            this.$el.append(this.taskbar.$el);
        },

        renderWidgets: function() {
            var me = this;

            me.$body = $(document.createElement('div')).addClass('body');

            this.collection.each(function (widgetState) {
                me.renderWidget(widgetState);
            });

            me.$el.append(me.$body);
        },

        renderWidget: function(widgetState) {
//            console.time('widget');
        
            var ww = new WidgetWindow({
                model: widgetState,
                containment: this.$body,
                zIndexManager: this.zIndexManager
            });

            this.$body.append(ww.render().$el);

//            console.timeEnd('widget');

            return ww;
        },

        addWidget: function(widget) {
            this.renderWidget(widget);
        },

        launchWidget: function (evt, model) {
            var ww = this.renderWidget(model);
            return ww;
        }
    });
});
