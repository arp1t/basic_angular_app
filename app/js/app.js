var app=angular.module("BoltNetworkApp",['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
	  .state('website',{
	  	url:'/',
	  	views: {
	  		'': {templateUrl: '/views/home.html', controller: 'MainController'},
	  		'header': {templateUrl: '/views/templates/header.tpl.html'},
	  		'footer': {templateUrl: '/views/templates/footer.tpl.html'}
	  	}

	  })
	  .state('about',{
	  	url:'/about',
	  	views: {
	  		'': {templateUrl: '/views/about.html'},
	  		'header': {templateUrl: '/views/templates/header.tpl.html'},
	  		'footer': {templateUrl: '/views/templates/footer.tpl.html'}
	  	}
	  })
	  .state('pricing',{
	  	url:'/pricing',
	  	templateUrl: '/views/pricing.html'
	  });

	$urlRouterProvider.otherwise('/');

});