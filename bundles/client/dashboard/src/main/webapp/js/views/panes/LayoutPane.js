define([
    'views/panes/Pane',
    'collections/WidgetStatesCollection',
    'backbone',
    'jquery',
    'lodash'
], function (View, WidgetStatesCollection, Backbone, $, _) {
    
    'use strict';

    return View.extend({
        vtype: 'layoutpane',

        className: 'pane',

        modelEvents: {
            'add': 'addWidget'
        },

        views: function () {
            return this.options.box;
        },
        
        initialize: function () {
            View.prototype.initialize.apply(this, arguments);

            //for now, accept collections as either 'collection' or 'widgets'
            var collectionProp = this.options.collection ? 'collection' : 'widgets';

            this.collection = this.options[collectionProp] instanceof Backbone.Collection ? 
                this.options[collectionProp] :
                new WidgetStatesCollection(this.options[collectionProp] || []);

            this.collection.on('change:active', _.bind(this.changeActivation, this));
        },

        afterRender: function () {
            this.$el.append( '<div class="paneshim hide"></div>' );
        },

        //abstract method, override to provide widget activation semantics
        changeActivation: $.noop,

        addWidget: $.noop, //abstract

        launchWidget: function (evt, model) {}

    });

});
