define([
    'views/panes/DesktopPane',
    'backbone',
    'views/View',
    'views/box/HBox',
    'views/box/VBox',
    'views/panes/Pane',
    'views/panes/BoxPane',
    'lodash'
], function (DesktopPane, Backbone, View, HBox, VBox, Pane, BoxPane, _) {
    
    'use strict';

    return View.extend({
        vtype: 'personaldashboard',

        className: 'dashboard',

        views: function () {
            var layoutConfig = this.model.get('layoutConfig');
            return _.isString( layoutConfig ) ? JSON.parse( layoutConfig ) : layoutConfig;
        },

        afterRender: function() {
            // Set the browser title to the dashboard name.
            document.title = this.model.get('name');
            return this; 
        }
        
    });

});
