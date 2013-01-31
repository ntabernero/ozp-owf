/*global require, initialWidgetDefinitions, initialDashboards*/
require([
	'views/DashboardContainer',
	'collections/PersonalWidgetDefinitionsCollection',
	'collections/PersonalDashboardsCollection',

	'jquery'
], function (DashboardContainer, PersonalWidgetDefinitionsCollection, PersonalDashboardsCollection, $) {

	// create a collection of dashboards from initial data
    var personalWidgetDefinitionsCollection = new PersonalWidgetDefinitionsCollection(initialWidgetDefinitions);

	// create a collection of dashboards from initial data
    var personalDashboardsCollection = new PersonalDashboardsCollection(initialDashboards);

	var container = new DashboardContainer({
        collection: personalDashboardsCollection
    });
	container.render();

});