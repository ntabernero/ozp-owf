require([
	'views/dashboard/PersonalDashboard',
	'jquery'
], function (Dashboard, $) {
	
	var dashboardModel = new Backbone.Model({
		name: 'Intents'
	});

	var dashboard = new Dashboard({
		model: dashboardModel
	});
	
	$('body').html(dashboard.render().el);

});