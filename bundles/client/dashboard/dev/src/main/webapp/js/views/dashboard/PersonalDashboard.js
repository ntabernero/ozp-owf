define([
    'views/panes/DesktopPane',
    'backbone'
], function (DesktopPane, Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        className: 'dashboard',

        render: function() {
            // Get the dashboard.
            
            // Create a desktop pane for it.
            var desktopPane = new DesktopPane(JSON.parse(this.model.get('layoutConfig')));
            this.$el.html(desktopPane.render().el);
            
            // Set the browser title to the dashboard name.
            document.title = this.model.get('name');
            return this; 
        }
        
    });

});