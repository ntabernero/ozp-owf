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
    'views/DashboardContainer',
    'collections/PersonalWidgetDefinitionsCollection',
    'collections/PersonalDashboardsCollection',

    'backbone',
    'jquery'
], function (Router, DashboardContainer, PersonalWidgetDefinitionsCollection, PersonalDashboardsCollection, Backbone, $) {


    // create a collection of dashboards from initial data
    var personalWidgetDefinitionsCollection = new PersonalWidgetDefinitionsCollection(initialWidgetDefinitions);

    // create a collection of dashboards from initial data
    var personalDashboardsCollection = new PersonalDashboardsCollection(initialDashboards);

    var dashboardContainer = new DashboardContainer({
        personalWidgetDefinitionsCollection: personalWidgetDefinitionsCollection,
        personalDashboardsCollection: personalDashboardsCollection
    });

    var router = new Router({
        dashboardContainer: dashboardContainer
    });

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    Backbone.history.start();

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function(evt) {
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

    return {
        router: router,
        dashboardContainer: dashboardContainer
    };
});