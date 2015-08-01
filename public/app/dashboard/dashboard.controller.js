(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard')
	.controller('dashboard.DashboardCtrl', ['$scope', '$http',

		function ($scope, $http) {
			var baseUrl = window.location.origin + '/';
			$scope.users= [];
			$scope.properties = [];
		}

	]);
	
}());