/*
 * Copyright 2013 Next Century Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

        initialize: function () {
            this.activeDashboard = null;
            this.activatedDashboards = {};

            EventBus.on('launch-widget', this.launchWidget, this);
            EventBus.on('dashboard:switch', this.activateDashboard, this);
            EventBus.on('dashboard:create', this.createDashboard, this);
        },

        render: function (model) {
            this.activateDashboard(model);
            return this;
        },

        activateDashboard: function (model, animate) {
            var guid = null,
                dashboardName = null,
                dashboardModel = null;


            console.time(dashboardName);

            if (model != null) {
                dashboardModel = this.options.personalDashboardsCollection.get(model.get('guid'));
            }

            //if dashboardcontainer has not rendered yet and the dashboard to switch doesn't exist
            //choose a dashboard to render
            if (!this.rendered && dashboardModel == null) {

                //todo make this the default dashboard
                dashboardModel = this.options.personalDashboardsCollection.at(0);
            }

            //check if a dashboardModel was found
            if (dashboardModel != null) {
                guid = dashboardModel.get('guid');
                dashboardName = dashboardModel.get('name');

                if (this.activeDashboard) {
                    //on the same dashboard just return
                    if (this.activeDashboard.model.get('guid') === guid) {
                        return this.activeDashboard;
                    }

                    //hide the previous dash
                    this.activeDashboard.hide();

                    //todo save state of the previous dashboard here
                }

                //have we seen this dash before?
                if (this.activatedDashboards[ guid ]) {
                    //save ref as the activeDashboard
                    this.activeDashboard = this.activatedDashboards[ guid ];

                    //show dash
                    this.activeDashboard.show(animate);
                }
                else {
                    //else we haven't rendered this dash - create it, save a ref to it, and render it
                    this.activeDashboard = new PersonalDashboard({
                        model: dashboardModel
                    });

                    this.activatedDashboards[ guid ] = this.activeDashboard;
                    this.$el.append(this.activeDashboard.render().el);
                }

                // Set the browser title to the dashboard name.
                document.title = dashboardModel.get('name');

                EventBus.trigger('dashboard:switched', dashboardModel);
            }
//            else {
//                //trying to activate a dashboard that does not exist - do nothing stay on same dash
//            }

            this.rendered = true;

            console.timeEnd(dashboardName);

            return this.activeDashboard;
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

        designDashboard: function (model) {
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
                    },function (model) {

                    }).
                    always(function (model) {
                        EventBus.trigger('launchend');
                    });
        }


    });

});