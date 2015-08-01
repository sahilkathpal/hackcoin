(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard')
	.controller('dashboard.DashboardCtrl', ['$scope', '$http',

		function ($scope, $http) {
			var baseUrl = window.location.origin + '/';
			$scope.users= [];
			$scope.properties = [];
			$http.get(baseUrl + 'dashboard/users')
				.success(function (data) {
					$scope.users = data;
				});

			$http.get(baseUrl + 'dashboard/properties')
				.success(function (data) {
					$scope.properties = data;
				});
			$scope.btn = {
				text: 'Button text',
				link: ''
			};
			$scope.propBtn = {};
			$scope.propBtn = {
				text: 'Viel all properties',
				link: ''
			};
			$scope.usersBtn = {
				text: 'Viel all users',
				link: 'users'
			};
		}

	]);
	
}());