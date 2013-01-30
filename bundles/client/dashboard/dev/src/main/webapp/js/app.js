require([
	'views/dashboard/PersonalDashboard',
	'views/dashboard/CreateEditDashboard',
	'views/dashboard/designer/Designer',
	'jquery'
], function (Dashboard, CreateEditDashboard, DashboardDesigner, $) {
	
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
		
        cd.create().then(function( dashboardModel ) {
            var me =this,
                dd = new DashboardDesigner();

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

