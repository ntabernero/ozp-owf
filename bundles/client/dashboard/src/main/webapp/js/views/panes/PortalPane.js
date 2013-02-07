define([
    'views/panes/LayoutPane',

    'backbone'
], function (LayoutPane, Backbone) {
    
    'use strict';

    return LayoutPane.extend({

        model: null,

        className: 'pane',

        render: function() {
            this.$el.html('This is a portal pane.');
            return this;
        }
        
    });

});