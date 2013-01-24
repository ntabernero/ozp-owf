define([
    'views/View',
    'collections/WidgetStatesCollection',
    'backbone',
    'jquery',
    'lodash'
], function (View, WidgetStatesCollection, Backbone, $, _) {
    
    'use strict';

    return View.extend({

        className: 'pane',

        modelEvents: {
            'add': 'addWidget'
        },
        
        initialize: function () {
            View.prototype.initialize.apply(this, arguments);

            this.widgets = this.options.widgets instanceof Backbone.Collection ? 
                this.options.widgets :
                new WidgetStatesCollection(this.options.widgets || []);

            this.widgets.on('change:active', _.bind(this.changeActivation, this));
        },

        render: function () {
            this.$el.append( '<div class="paneshim hide"></div>' );
        },

        //abstract method, override to provide widget activation semantics
        changeActivation: $.noop,

        addWidget: $.noop, //abstract

        launchWidget: function (evt, model) {}

    });

});
