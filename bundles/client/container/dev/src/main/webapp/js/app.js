require([
	'views/Container',
	'jquery'
], function (Container, $) {
	
	var container = new Container();
	$('body').html(container.render().el);

});