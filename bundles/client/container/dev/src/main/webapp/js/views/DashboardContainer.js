/*global define*/
define([
    'backbone',
    'models/PersonalDashboardModel',
    'views/dashboard/PersonalDashboard',
    'jquery'

], function (Backbone, PersonalDashboardModel, PersonalDashboard, $) {

    return Backbone.View.extend({

        el: $('#dashboard-container'),

        initialize: function() {

        },

        render: function() {


            // Create a test dashboard.
            var layout = {
                widgets: [
                    {
                        title: 'Widget One',
                        url: 'widget.html',
                        x: 50,
                        y: 50,
                        width: 400,
                        height: 500,
                        zIndex: 10000,
                        maximizable: true,
                        minimizable: true,
                        closable: true
                    },
                    {
                        title: 'Widget Two',
                        url: 'widget.html',
                        x: 400,
                        y: 300,
                        width: 200,
                        height: 200,
                        zIndex: 10000,
                        maximizable: true,
                        minimizable: true,
                        closable: true
                    }
                ]
            };

            var dashboardModel = new PersonalDashboardModel({
                name: 'Test Dashboard',
                layoutConfig: JSON.stringify(layout)
            });

            var dashboard = new PersonalDashboard({
                model: dashboardModel
            });

            this.$el.append(dashboard.render().el);

            return this;
        }

    });

});