define([
    'views/View',
    'views/widgets/Header',
    'mixins/widgets/WidgetControl',
    'jquery',
    'backbone',
    'lodash'
], function (View, Header, WidgetControl, $, Backbone, _) {
    'use strict';
    
    //subclass of header with extra logic 
    //for being in the taskbar
    var TaskbarHeader = Header.extend(_.extend({}, WidgetControl, {
        events: function() {
            return _.extend({}, WidgetControl.events, Header.prototype.events);
        },

        initialize: function() {
            Header.prototype.initialize.apply(this, arguments);
            WidgetControl.initialize.apply(this, arguments);
        }
    }));

    return View.extend({
        className: 'taskbar', 

        modelEvents: {
            'add': 'addWidget'
        },

        initialize: function(options) {
            View.prototype.initialize.apply(this, arguments);

            this.collection = options.collection;
        },

        render: function() {
            this.collection.each(_.bind(this.addWidget, this));
            return this;
        },

        addWidget: function(widget) {
            var header = new TaskbarHeader({
                model: widget
            });

            header.render();
            this.$el.append(header.$el);
        }
    });
});
