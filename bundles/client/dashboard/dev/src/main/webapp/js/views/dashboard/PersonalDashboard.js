define([
    'backbone',
    'handlebars',
    'views/widgets/Window'
], function (Backbone, Handlebars, Header) {
    
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