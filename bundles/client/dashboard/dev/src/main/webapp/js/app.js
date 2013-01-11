require([
	'views/Dashboard',
	'jquery'
], function (Dashboard, $) {
	
	var dashboard = new Dashboard();
	$('body').html(dashboard.render().el);

});