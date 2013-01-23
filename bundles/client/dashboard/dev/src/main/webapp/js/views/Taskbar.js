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

        initialize: function(options) {
            _.bindAll(this);

            this.widgets = options.widgets;
            this.widgets.on({
                add: this.addWidget,
                remove: this.removeWidget,
                change: this.updateHeaderActive
            });

            //list of Header views
            this.headers = {};
        },

        render: function() {
            var me = this;

            this.widgets.each(function(widget) {
                me.addWidget(widget);
                me.updateHeaderActive(widget);
            });
        },

        addWidget: function(widget) {
            var header = new Header({
                model: widget
            });

            header.render();
            this.$el.append(header.$el);

            this.headers[widget.get('uniqueId')] = header;
        },

        removeWidget: function(widget) {
            var id = widget.get('uniqueId'),
                header = this.headers[id];

            if (header) {
                header.remove();
                delete this.headers[id];
            }
        },

        updateHeaderActive: function(widget) {
            var header = this.headers[widget.get('uniqueId')];

            //add or remove the active class as appropriate.  This is specific to
            header.$el[widget.get('active') ? 'addClass' : 'removeClass']('active');

        }
    });
});
