define([
    'views/panes/DesktopPane',
    'backbone',
    'views/View',
    'views/box/Box',
    'views/box/Pane',
    'views/panes/BoxPane',
    'lodash'
], function (DesktopPane, Backbone, View, Box, Pane, BoxPane, _) {
    
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
