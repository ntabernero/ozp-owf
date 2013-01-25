define([
    'views/panes/DesktopPane',
    'backbone'
], function (DesktopPane, Backbone) {
    
    'use strict';

    return Backbone.View.extend({

//        model: null,

        className: 'dashboard',

//        render: function() {
//            var desktopPane = new DesktopPane({
//                widgets: [{
//                    title: 'A Widget',
//                    url: 'widget.html',
//                    x: 50,
//                    y: 50,
//                    width: 400,
//                    height: 500,
//                    zIndex: 10000,
//                    maximizable: true,
//                    closable: true
//                }]
//            });
//
//            this.$el.html(desktopPane.render().el);
//            return this;
//        }
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