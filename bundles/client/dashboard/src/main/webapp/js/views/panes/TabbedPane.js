define([
    'views/panes/Pane',

    'backbone'
], function (Pane, Backbone) {
    
    'use strict';

    return Pane.extend({

        model: null,

        className: 'pane',

        render: function() {
            this.$el.html('This is a tabbed pane.');
            return this;
        }
        
    });

});