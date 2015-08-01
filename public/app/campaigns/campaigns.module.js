(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns', [])
	.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
		.when('/campaigns/add', {
			templateUrl: 'app/campaigns/html/add.html',
			controller: 'campaigns.AddCtrl'
		})

		.when('/campaigns', {
			templateUrl: 'app/campaigns/html/index.html',
			controller: 'campaigns.IndexCtrl'
		})

	}]);
	
}());