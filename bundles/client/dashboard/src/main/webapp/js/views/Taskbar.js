define([
    'views/View',
    'mixins/widgets/WidgetControl',
    'jquery',
    'backbone',
    'lodash',
    'jqueryui/jquery-ui.custom'
], function (View, WidgetControl, $, Backbone, _) {
    'use strict';
 
    /**
     * Creates a subclass of a Header class which has extra logic.
     * @param SuperClass The constructor for the immediate superclass
     * of the class to create.  Should Header or a subclass thereof.
     * @return The constructor for the new class
     */
    function createTaskbarHeaderClass(SuperClass) {
        return SuperClass.extend(_.extend({}, WidgetControl, {
            tagName: 'li',

            events: function() {
                return _.extend({}, WidgetControl.events, SuperClass.prototype.events);
            },

            initialize: function() {
                SuperClass.prototype.initialize.apply(this, arguments);
                WidgetControl.initialize.apply(this, arguments);
            }
        }));
    }   

    return View.extend({
        tagName: 'ol',

        className: 'taskbar', 

        modelEvents: {
            'add': 'addWidget'
        },

        initialize: function(options) {
            View.prototype.initialize.apply(this, arguments);

            this.collection = options.collection;

            this.TaskbarHeader = createTaskbarHeaderClass(options.HeaderClass);

            //TODO: This is temporary, take it out once dashboards
            //have code to call pane resize
            $(window).on('resize', _.bind(this.resize, this));
        },

        render: function() {
            this.$el.sortable({
                update: _.bind(this.handleReorder, this)
            });

            this.collection.each(_.bind(this.addWidget, this));
            return this;
        },

        addWidget: function(widget) {
            var header = new this.TaskbarHeader({
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
        },

        handleReorder: function(event, ui) {
            var $item = $(ui.item),
                header = $item.data('view');

            this.collection.updateIndex(header.model, $item.index());
        }
    });
});
