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
    'models/PersonalDashboardModel',
	'views/dashboard/PersonalDashboard',
	'collections/StacksCollection',
    'collections/WidgetDefinitionsCollection',
    'collections/PreferencesCollection',
    'collections/PeopleCollection',
    'collections/GroupsCollection',
    'collections/PersonalWidgetDefinitionsCollection',
    'collections/PersonalDashboardsCollection',
    'models/WidgetStateModel',

	'jquery'
], function (PersonalDashboardModel, Dashboard,
             StacksCollection, WidgetDefinitionsCollection, PreferencesCollection,
             PeopleCollection, GroupsCollection, PersonalWidgetDefinitionsCollection,
             PersonalDashboardsCollection, WidgetStateModel, $) {
	// Pull in a collection of dashboards.
    var personalDashboardsCollection = new PersonalDashboardsCollection();
    personalDashboardsCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " Dashboards");
        },
        error: function() {
            console.log("Failed to load any dashboards");
        }
    });
    
    // Pull in a collection of stacks.
    var stacksCollection = new StacksCollection();
    stacksCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " stacks");
        },
        error: function() {
            console.log("Failed to load any stacks");
        }
    });
   
    // Pull in a collection of dashboards.
    var widgetDefinitionsCollection = new WidgetDefinitionsCollection();
    widgetDefinitionsCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " widgets");
        },
        error: function() {
            console.log("Failed to load any widgets");
        }
    });
    
    // Pull in a collection of dashboards.
    var preferencesCollection = new PreferencesCollection();
    preferencesCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " preferences");
        },
        error: function() {
            console.log("Failed to load any preferences");
        }
    });
    
    // Pull in a collection of dashboards.
    var peopleCollection = new PeopleCollection();
    peopleCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " people");
        },
        error: function() {
            console.log("Failed to load any people");
        }
    });
    
    // Pull in a collection of dashboards.
    var groupsCollection = new GroupsCollection();
    groupsCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " groups");
        },
        error: function() {
            console.log("Failed to load any groups");
        }
    });

    // create a collection of dashboards from initial data
    var personalWidgetDefinitionsCollection = new PersonalWidgetDefinitionsCollection(initialWidgetDefinitions);

    // create a collection of dashboards from initial data
    var pdc = new PersonalDashboardsCollection(initialDashboards);

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

    // Create a test dashboard.
    var testDashboard = new PersonalDashboardModel({
        name: 'Test Dashboard',
        layoutConfig: pdc.at(0).get('layoutConfig')
    });
    
    // Save the dashboard to the server.
    testDashboard.save(testDashboard.attributes, {
        success: function(model, response, options) {
            console.log('Dashboard saved to server; rendering its value');
            
            // Just render a plain dashboard.
            var dashboard = new Dashboard({
                model: model
            });
            $('body').append(dashboard.render().el);
        },
        
        error: function(model, reponse, options) {
            console.log('Dashboard failed to save to the server; rendering a client-side definition');
            // Just render a plain dashboard.
            var dashboard = new Dashboard({
                model: testDashboard
            });
            $('body').append(dashboard.render().el);
        }
    });

});
