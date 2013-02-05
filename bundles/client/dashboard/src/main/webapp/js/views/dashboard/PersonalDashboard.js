define([
    'views/panes/FitPane',
    'backbone',
    'views/View'
], function (FitPane, Backbone, View) {
    
    'use strict';

    return View.extend({

        className: 'dashboard',

        render: function() {
            // Get the dashboard.
            
            // Create a desktop pane for it.
            var pane = new FitPane(JSON.parse(this.model.get('layoutConfig')));
            this.$el.html(pane.render().el);
            
            // Set the browser title to the dashboard name.
            document.title = this.model.get('name');
            return this; 
        }
        
    });

});
