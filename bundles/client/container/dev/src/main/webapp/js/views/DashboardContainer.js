/*global define*/
define([
    'views/dashboard/PersonalDashboard',
    'events/EventBus',

    //libraries
    'backbone',
    'jquery'

], function (PersonalDashboard, EventBus, Backbone, $) {

    return Backbone.View.extend({

        rendered: false,
        el: $('#dashboard-container'),

        initialize: function() {
            this.activeDashboard = null;
            this.activatedDashboards = {};

            EventBus.on('launch-widget', this.launchWidget, this);
            EventBus.on('dashboard:switch', this.activateDashboard, this);
            EventBus.on('dashboard:create', this.createDashboard, this);
        },

        render: function() {

            var dashboardModel = this.options.personalDashboardsCollection.at(0);

            var dashboard = new PersonalDashboard({
                model: dashboardModel
            });
            this.activeDashboard = dashboard;

            this.$el.append(dashboard.render().el);

            this.rendered = true;

            return this;
        },

        activateDashboard: function (model, animate) {
            var guid = model.get('guid'),
                dashboardName = model.get('name'),
                dashboardModel = this.options.personalDashboardsCollection.get(model.get('guid'));

            console.time(dashboardName);
            if( this.activeDashboard ) {
                if( this.activeDashboard.model.get('guid') === guid ) {
                    return;
                }

                this.activeDashboard.hide();
            }

            if( this.activatedDashboards[ guid ] ) {
                this.activeDashboard = this.activatedDashboards[ guid ];
                this.activeDashboard.show();
            }
            else {
                this.activeDashboard = new PersonalDashboard({
                    model: dashboardModel
                }).render();

                this.activatedDashboards[ guid ] = this.activeDashboard;
                this.$el.append(this.activeDashboard.$el);

                // layout after dom write
                this.activeDashboard.layout().show(animate);
            }
            console.timeEnd(dashboardName);
        },

        createDashboard: function () {
//            var me = this,
//                ced = new CreateEditDashboard();
//
//            $(document.body).append( ced.render().$el );
//
//            ced.show();
//            ced.create().then(function (model) {
//                me.designDashboard( model );
//            });
        },

        designDashboard: function ( model ) {
//            var me =this,
//                dd = new DashboardDesigner();
//
//            dd.render();
//            $(document.body).append(dd.$el);
//
//            dd.design().then(function(config) {
//                dd.remove();
//                model.set( 'layoutConfig', config );
//
//                this.options.personalDashboardsCollection.add(model);
//                me.activateDashboard(model);
//            });

        },

        launchWidget: function (model) {
            return this.activeDashboard.launchWidget(model).then(
                function (model, view) {
                    EventBus.trigger('afterwidgetlaunch');
                }, function  (model) {

                }).
                always(function (model) {
                    EventBus.trigger('launchend');
                });
        }


    });

});