require([
    'models/PersonalDashboardModel',
    'collections/PersonalDashboardsCollection',
	'views/dashboard/PersonalDashboard',
	'collections/StacksCollection',
    'collections/WidgetDefinitionsCollection',
    'collections/PreferencesCollection',
    'collections/PeopleCollection',
    'collections/GroupsCollection',
    'services/Dashboard',
	'jquery'
], function (PersonalDashboardModel, PersonalDashboardsCollection, Dashboard, 
             StacksCollection, WidgetDefinitionsCollection, PreferencesCollection,
             PeopleCollection, GroupsCollection, DashboardService, $) {
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
        vtype: 'desktoppane',
        paneType: 'desktoppane',
        widgets: [{
            name: 'Widget One',
            url: 'widget.html',
            x: 50,
            y: 50,
            width: 400,
            height: 500,
            zIndex: 2
        }, {
            name: 'Widget Two',
            url: 'widget.html',
            x: 400,
            y: 300,
            width: 200,
            height: 200,
            zIndex: 1
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
                dashboardModel = new PersonalDashboardModel({
                    layoutConfig: {
                        vtype: 'designerpane',
                        paneType: 'tabbed',
                        box: {
                            vtype: 'designerbox',
                            orientation: "vertical",
                            panes: [{
                                vtype: 'designerpane',
                                collapsible: false,
                                htmlText: '50%',
                                width: '50%'
                            }, {
                                vtype: 'designerpane',
                                collapsible: false,
                                htmlText: '50%',
                                width: '50%',
                                box: {
                                    vtype: 'designerbox',
                                    orientation: "horizontal",
                                    panes: [{
                                        vtype: 'designerpane',
                                        collapsible: false,
                                        htmlText: '50%',
                                        height: '50%'
                                    }, {
                                        vtype: 'designerpane',
                                        collapsible: false,
                                        htmlText: '50%',
                                        height: '50%',
                                        box: {
                                            vtype: 'designerbox',
                                            orientation: "horizontal",
                                            panes: [{
                                                vtype: 'designerpane',
                                                collapsible: false,
                                                htmlText: '50%',
                                                height: '50%'
                                            }, {
                                                vtype: 'designerpane',
                                                collapsible: false,
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
