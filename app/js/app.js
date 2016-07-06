var app=angular.module("BoltNetworkApp",['ngFlash','ui.router']);

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

// Flash controller
app.controller('NotificationController', ['$rootScope', '$scope', 'Flash', '$timeout', function($rootScope, $scope, Flash, $timeout) {
  $scope.success = function() {
  var message = '<strong>Well done!</strong> You successfully read this important alert message.';
  Flash.create('success', message);
  };
  $scope.info = function() {
  var message = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
  Flash.create('info', message);
  };
  $scope.warning = function() {
  var message = '<strong>Warning!</strong> Better check yourself, you\'re not looking too good.';
  Flash.create('warning', message);
  };
  $scope.danger = function() {
  var message = '<strong>Oh snap!</strong> Change a few things up and try submitting again.';
  Flash.create('danger', message);
  };
}]);