define([
    'backbone',
    'handlebars'
], function (Backbone, Handlebars) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,

        className: 'dashboard',

        render: function() {
            this.$el.html('This is ' + this.model.get('name') + ' dashboard.');
            return this;
        }
        
    });

});