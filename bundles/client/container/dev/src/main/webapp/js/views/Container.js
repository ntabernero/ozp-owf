define([
    'backbone',
     'views/dashboard/PersonalDashboard'

], function (Backbone, Dashboard) {

    return Backbone.View.extend({

        render: function() {
            //this.$el.html('This is a Container.');


            var dashboardModel = new Backbone.Model({
                name: 'Intents'
            });

            var dashboard = new Dashboard({
                model: dashboardModel
            });

            this.$el.css('height', '100%');
            this.$el.css('width', '100%');

            this.$el.append(dashboard.render().el);

            return this;
        }

    });

});