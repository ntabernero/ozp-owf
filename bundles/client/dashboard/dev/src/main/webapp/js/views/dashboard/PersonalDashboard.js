define([
    'views/panes/DesktopPane',
    'backbone',
    'views/View'
], function (DesktopPane, Backbone, View) {
    
    'use strict';

    return View.extend({

        model: null,

        className: 'dashboard',

        render: function() {
            var desktopPane = new DesktopPane({
                widgets: [{
                    title: 'A Widget',
                    url: 'widget.html',
                    x: 50,
                    y: 50,
                    width: 400,
                    height: 500,
                    zIndex: 10000,
                    maximizable: true,
                    closable: true
                }]
            });

            this.$el.html(desktopPane.render().el);
            return this;
        }
        
    });

});
