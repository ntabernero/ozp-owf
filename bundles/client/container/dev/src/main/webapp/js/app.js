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

/*global require, initialWidgetDefinitions, initialDashboards*/
define([
    'router',
    'events/EventBus',
    'views/Banner',
    'views/DashboardContainer',
    'collections/PersonalWidgetDefinitionsCollection',
    'collections/PersonalDashboardsCollection',
    'models/WidgetStateModel',

    'backbone',
    'jquery'
], function (Router, EventBus, Banner, DashboardContainer, PersonalWidgetDefinitionsCollection, PersonalDashboardsCollection,
             WidgetStateModel, Backbone, $) {

    // create a collection of dashboards from initial data
    var personalWidgetDefinitionsCollection = new PersonalWidgetDefinitionsCollection(initialWidgetDefinitions);

    // create a collection of dashboards from initial data
    var personalDashboardsCollection = new PersonalDashboardsCollection(initialDashboards);

    //alter widgetstatemodel so the get function will lookup any properties it doesn't have on the corresponding widgetdef
    WidgetStateModel.prototype.get = function(attr) {
        var returnValue;
        if (this.attributes[attr] !== undefined) {
            returnValue = this.attributes[attr];
        }
        else if (this.get('widgetGuid') != null){
            var widgetDef = personalWidgetDefinitionsCollection.find(function(pwd) {
                return pwd.get('guid') === this.get('widgetGuid');
            },this);
            if (widgetDef != null) {
                returnValue = widgetDef.get(attr);
            }
        }
        return returnValue;
    };

    var banner = new Banner({});
    var dashboardContainer = new DashboardContainer({
        personalWidgetDefinitionsCollection: personalWidgetDefinitionsCollection,
        personalDashboardsCollection: personalDashboardsCollection
    });

    var router = new Router();

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    Backbone.history.start();

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function (evt) {
        // Get the absolute anchor href.
        var href = $(this).attr("href");

        // If the href exists and is a hash route, run it through Backbone.
        if (href && href.indexOf("#") === 0) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href, true);
        }
    });

    EventBus.on('dashboard:create', function() {
        require([
            'views/dashboard/CreateEditDashboard',
            'views/designer/Designer',
            'services/Dashboard'
        ], function(CreateEditDashboard, DashboardDesigner, DashboardService) {
            
            var cd = new CreateEditDashboard({
                title: 'Create Dashboard',
                removeOnClose: true
            });

            cd.show();
           
            cd.create().then(function( dashboardModel ) {
                var me =this,
                    dd = new DashboardDesigner({
                        model: dashboardModel
                    });

                dd.render();
                $(document.body).append(dd.$el);

                dd.design().then(function(config) {
                    dd.remove();

                    dashboardModel.set( 'layoutConfig', DashboardService.convertForDashboard( config ) );

                    personalDashboardsCollection.add( dashboardModel );
                });
            });
        });
    });

    return {
        router: router,
        dashboardContainer: dashboardContainer,
        personalWidgetDefinitionsCollection: personalWidgetDefinitionsCollection,
        personalDashboardsCollection: personalDashboardsCollection
    };
});