define([
    'views/panes/LayoutPane',

    'backbone'
], function (LayoutPane, Backbone) {
    
    'use strict';

    return LayoutPane.extend({

        model: null,

        className: 'pane',

        render: function() {
            this.$el.html('This is an accordion pane.');
            return this;
        }
        
    });

});