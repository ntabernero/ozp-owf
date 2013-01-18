define([
    'views/panes/DesktopPane',
    'backbone'
], function (DesktopPane, Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,

        className: 'dashboard',

        render: function() {
            var desktopPane = new DesktopPane({
                widgets: [{
                    name: 'A Widget',
                    url: 'widget.html',
                    x: 50,
                    y: 50,
                    width: 400,
                    height: 500
                }]
            });

            this.$el.html(desktopPane.render().el);
            return this;
        }
        
    });

});