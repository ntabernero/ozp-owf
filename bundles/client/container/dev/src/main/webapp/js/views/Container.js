/*global define*/
define([
    'backbone',
     'views/dashboard/PersonalDashboard',
     'jquery'

], function (Backbone, Dashboard, $) {

    return Backbone.View.extend({

        el: $('#dashboard-container'),

        initialize: function() {

        },

        render: function() {

            var dashboardModel = new Backbone.Model({
                name: 'Intents'
            });

            var dashboard = new Dashboard({
                model: dashboardModel
            });

            this.$el.append(dashboard.render().el);

            return this;
        }

    });

});