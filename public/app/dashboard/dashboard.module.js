(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'app/dashboard/html/index.html',
			controller: 'dashboard.DashboardCtrl'
		});
	}]);
	
}());