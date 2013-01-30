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

require([
    'models/PersonalDashboardModel',
    'collections/PersonalDashboardsCollection',
	'views/dashboard/PersonalDashboard',
	'collections/StacksCollection',
    'collections/WidgetDefinitionsCollection',
    'collections/PreferencesCollection',
    'collections/PeopleCollection',
    'collections/GroupsCollection',
	'jquery'
], function (PersonalDashboardModel, PersonalDashboardsCollection, Dashboard, 
             StacksCollection, WidgetDefinitionsCollection, PreferencesCollection,
             PeopleCollection, GroupsCollection, $) {
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
    
    // Create a test dashboard.
    var layout = {
        widgets: [{
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
        }, {
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
        }]
    };
    
    var testDashboard = new PersonalDashboardModel({
        name: 'Test Dashboard',
        layoutConfig: JSON.stringify(layout)
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
