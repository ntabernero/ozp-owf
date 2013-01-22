define([
    'views/View',
    'views/widgets/Header',
    'jquery',
    'backbone',
    'lodash'
], function (View, Header, $, Backbone, _) {
    'use strict';

    return View.extend({
        className: 'taskbar', 

        initialize: function() {

            _.bindAll(this);

            this.widgets.on({
                add: this.addWidget,
                remove: this.removeWidget
            });

            //list of Header views
            this.headers = {};
        },

        render: function() {
            this.widgets.each(this.addWidget);
        },

        addWidget: function(widget) {
            var header = new Header({
                model: widget
            });

            this.$el.append(header.$el);

            this.headers[widget.uniqueId] = header;
        },

        removeWidget: function(widget) {
            var header = this.headers[widget.uniqueId];

            if (header) {
                header.remove();
                delete this.header[widget.uniqueId];
            }
        }
    });
});
