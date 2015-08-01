(function () {
	'use strict';
	
	angular.module('BrsManager.properties', [])
	.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
		.when('/properties/add', {
			templateUrl: 'app/properties/html/add.html',
			controller: 'properties.AddPropertyCtrl'
		})

		.when('/properties/:id/edit', {
			templateUrl: 'app/properties/html/add.html',
			controller: 'properties.EditPropertyCtrl'
		})

		.when('/properties', {
			templateUrl: 'app/properties/html/index.html',
			controller: 'properties.PropertiesCtrl'
		})

	}]);
	
}());