define([
    'views/View',
    'views/widgets/WindowHeader',
    'mixins/widgets/WidgetControl',
    'jquery',
    'backbone',
    'lodash'
], function (View, WindowHeader, WidgetControl, $, Backbone, _) {
    'use strict';
    
    //subclass of header with extra logic 
    //for being in the taskbar
    var TaskbarHeader = WindowHeader.extend(_.extend({}, WidgetControl, {
        events: function() {
            return _.extend({}, WidgetControl.events, WindowHeader.prototype.events);
        },

        initialize: function() {
            WindowHeader.prototype.initialize.apply(this, arguments);
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

            //TODO: This is temporary, take it out once dashboards
            //have code to call pane resize
            $(window).on('resize', _.bind(this.resize, this));
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

            this.handleOverflow();
        },

        resize: function() {
            this.handleOverflow();
        },

        handleOverflow: function() {
            var taskbarWidth = this.$el.width(),
                unchangeableWidth = 0,  //the total width of paddings, borders, and margins on content
                changeableWidth = 0,    //sum of inner widths of headers
                ratio;

            this.$el.children('.header').each(function(idx, header) {
                var $header = $(header),
                    outerWidth,
                    innerWidth;

                $(header).css('width', ''); //unset manual width
                outerWidth = $header.outerWidth(true); //true to include margin
                innerWidth = $header.width();

                changeableWidth += innerWidth;
                unchangeableWidth += outerWidth - innerWidth;
            });

            //need taskbarWidth = unchangeableWidth + changeableWidth * ratio; solve for ratio
            ratio = (taskbarWidth - unchangeableWidth) / changeableWidth;

            //if content is too wide, resize according to calculated ratio
            if (ratio < 1) {
                this.$el.children('.header').each(function(idx, header) {
                    var $header = $(header);

                    $header.width($header.width() * ratio);
                });
            }
        }
    });
});
