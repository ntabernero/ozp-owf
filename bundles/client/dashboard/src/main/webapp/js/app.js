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
    'models/DashboardInstanceModel',
	'views/dashboard/DashboardInstance',
	'collections/StacksCollection',
    'collections/WidgetDefinitionsCollection',
    'collections/PreferencesCollection',
    'collections/PeopleCollection',
    'collections/GroupsCollection',
    'collections/PersonalWidgetDefinitionsCollection',
    'collections/DashboardInstancesCollection',
    'models/WidgetStateModel',
	'services/Dashboard',
	'jquery'
], function (DashboardInstanceModel, Dashboard,
             StacksCollection, WidgetDefinitionsCollection, PreferencesCollection,
             PeopleCollection, GroupsCollection, PersonalWidgetDefinitionsCollection,
             DashboardInstancesCollection, WidgetStateModel, DashboardService, $) {
	// Pull in a collection of dashboards.
    var dashboardInstancesCollection = new DashboardInstancesCollection();
    dashboardInstancesCollection.fetch({
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
   
    // Pull in a collection of widget definitions
    var widgetDefinitionsCollection = new WidgetDefinitionsCollection();
    widgetDefinitionsCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " widgets");
        },
        error: function() {
            console.log("Failed to load any widgets");
        }
    });
    
    // Pull in a collection of people
    var peopleCollection = new PeopleCollection();
    peopleCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " people");
        },
        error: function() {
            console.log("Failed to load any people");
        }
    });
    
    // Pull in a collection of groups
    var groupsCollection = new GroupsCollection();
    groupsCollection.fetch({
        success: function(collection) {
            console.log("Loaded " + collection.length + " groups");
        },
        error: function() {
            console.log("Failed to load any groups");
        }
    });

    // create a collection of PersonalWidgetDefinitions from the WidgetDefinitions
    var personalWidgetDefinitionsCollection = new PersonalWidgetDefinitionsCollection(initialWidgetDefinitions);

    // create a collection of dashboards from initial data
    var dashboards = new DashboardInstancesCollection(initialDashboards);

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
    var testDashboard = new DashboardInstanceModel({
        name: 'Test Dashboard',
        layoutConfig: dashboards.at(0).get('layoutConfig')
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

    $('#create-dashboard').on('click', function () {
        require([
            'views/dashboard/CreateEditDashboard',
            'views/designer/Designer'
        ], function(CreateEditDashboard, DashboardDesigner) {
            
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
                    dashboardModel.set( 'layoutConfig', config );

                    console.log(config);
                });
            });
        });
    });

    $('#design-dashboard').on('click', function() {

        require([
            'views/designer/Designer'
        ], function(DashboardDesigner) {
            
            var me = this,
                dashboardModel = new DashboardInstanceModel({
                    layoutConfig: {
                        vtype: 'designerpane',
                        paneType: 'tabbed',
                        box: {
                            vtype: 'hbox',
                            panes: [{
                                vtype: 'designerpane',
                                htmlText: '50%',
                                width: '50%'
                            }, {
                                vtype: 'designerpane',
                                htmlText: '50%',
                                width: '50%',
                                box: {
                                    vtype: 'vbox',
                                    panes: [{
                                        vtype: 'designerpane',
                                        htmlText: '50%',
                                        height: '50%',
                                        box: {
                                            vtype: 'vbox',
                                            panes: [{
                                                vtype: 'designerpane',
                                                htmlText: '50%',
                                                height: '50%'
                                            }, {
                                                vtype: 'designerpane',
                                                htmlText: '50%',
                                                height: '50%'
                                            }]
                                        }
                                    }, {
                                        vtype: 'designerpane',
                                        htmlText: '50%',
                                        height: '50%',
                                        box: {
                                            vtype: 'vbox',
                                            panes: [{
                                                vtype: 'designerpane',
                                                htmlText: '50%',
                                                height: '50%'
                                            }, {
                                                vtype: 'designerpane',
                                                htmlText: '50%',
                                                height: '50%'
                                            }]
                                        }
                                    }]
                                }
                            }]
                        }
                    }
                });
            
            var dd = new DashboardDesigner({
                    model: dashboardModel
                });

            dd.design().then(function(config) {
                dd.remove();
                config = DashboardService.convertForDashboard( config );
                dashboardModel.set( 'layoutConfig', config );

                console.log( config );

                $('.dashboard').data('view').remove();

                var dashboard = new Dashboard({
                    model: dashboardModel
                });
                $('body').append(dashboard.render().el);
            });
        
            $(document.body).append(dd.$el);
        });
       
    });

});
