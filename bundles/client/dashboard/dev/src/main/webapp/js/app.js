require([
	'views/dashboard/PersonalDashboard',
	'views/dashboard/CreateEditDashboard',
	'jquery'
], function (Dashboard, CreateEditDashboard, $) {
	
	var dashboardModel = new Backbone.Model({
		name: 'Intents'
	});

	var dashboard = new Dashboard({
		model: dashboardModel
	});
	
	$('body').append(dashboard.render().el);
	
	$('#create-dashboard').on('click', function () {
		var cd = new CreateEditDashboard({
            title: 'Create Dashboard',
            removeOnClose: true
        });

		cd.show();
		
        cd.create().then(function() {
            console.log(arguments);
        });
	});

});