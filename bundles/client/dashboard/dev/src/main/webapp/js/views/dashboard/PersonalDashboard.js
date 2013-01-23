define([
    'views/panes/DesktopPane',
    'collections/WidgetStatesCollection',
    'backbone',
    'views/View'
], function (DesktopPane, WidgetStatesCollection,  Backbone, View) {
    
    'use strict';

    return View.extend({

        model: null,

        className: 'dashboard',

        render: function() {
            var desktopPane = new DesktopPane({
                widgets: new WidgetStatesCollection([{
                    title: 'A Widget',
                    uniqueId: '1234-5678',
                    url: 'widget.html',
                    x: 50,
                    y: 50,
                    width: 400,
                    height: 500,
                    zIndex: 10000,
                    maximizable: true,
                    closable: true,
                    active: true
                },
                {
                    title: 'B Widget',
                    uniqueId: '1234-5678-91011',
                    url: 'widget.html',
                    x: 100,
                    y: 100,
                    width: 400,
                    height: 500,
                    zIndex: 10000,
                    maximizable: true,
                    closable: true
                }])
            });

            this.$el.html(desktopPane.render().el);
            return this;
        }
        
    });

});
