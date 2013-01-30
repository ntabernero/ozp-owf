/*global require*/
require([
	'views/DashboardContainer',
	'jquery'
], function (DashboardContainer, $) {
	
	var container = new DashboardContainer();
	container.render();

});