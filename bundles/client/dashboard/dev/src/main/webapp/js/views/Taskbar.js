define([
    'views/View',
    'views/widgets/Header',
    'jquery',
    'backbone',
    'lodash'
], function (View, Header, $, Backbone, _) {
    'use strict';
    
    //subclass of header with extra logic 
    //for being in the taskbar
    var TaskbarHeader = Header.extend({
        events: function() {
            return _.extend({
                "click": 'activateWidget'
            }, Header.prototype.events);

        },

        initialize: function() {
            Header.prototype.initialize.apply(this, arguments);
            _.bindAll(this, 'activateWidget', 'updateActive');

            this.model.on('change:active', this.updateActive);

            this.updateActive();
        },

        activateWidget: function() {
            this.model.set('active', true);
        },

        updateActive: function() {
            //add or remove the active class as appropriate
            this.$el[this.model.get('active') ? 'addClass' : 'removeClass']('active');
        }
    });

    return View.extend({
        className: 'taskbar', 

        initialize: function(options) {
            View.prototype.initialize.apply(this, arguments);
            _.bindAll(this, 'addWidget', 'removeWidget');

            this.widgets = options.widgets;
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
            var header = new TaskbarHeader({
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
        }

    });
});
