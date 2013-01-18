define([
    'backbone'
], function (Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        className: 'pane',
        
        initialize: function () {
            this.widgets = new Backbone.Collection(this.options.widgets || []);
        },

        render: function () {
            this.$el.append( '<div class="paneshim hide"></div>' );
        },

        launchWidget: function (evt, model) {}

    });

});