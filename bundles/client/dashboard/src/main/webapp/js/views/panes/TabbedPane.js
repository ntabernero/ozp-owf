define([
    'views/panes/Pane',
    'views/widgets/Header',
    'views/widgets/WidgetControlIframe',
    'views/Taskbar',
    'backbone',
    'jquery'
], function (Pane, Header, WidgetControlIframe, Taskbar, Backbone, $) {
    'use strict';

    return Pane.extend({
        className: 'pane tabbedpane',

        $body: null,
        tabbar: null,

        render: function() {
            var me = this; 

            Pane.prototype.render.apply(me, arguments);

            me.tabbar = new Taskbar({
                collection: me.collection,
                HeaderClass: Header
            });

            me.$body = $('<div class="body">');

            me.$el.append(me.tabbar.render().$el)
                    .append(me.$body);

            me.collection.each(function(widgetState) {
                  me.addWidget(widgetState);             
            });

            //if no widget is active, activate first widget
            if (!me.$('.widgetframe.active').length && me.collection.length) {
                me.collection.at(0).set('active', true);
            }

            return me;
        },

        addWidget: function(widget) {
            var frame = new WidgetControlIframe({
                model: widget
            });

            this.$body.append(frame.render().$el);
        }
    });
});
