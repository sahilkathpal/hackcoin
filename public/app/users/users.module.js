(function () {
	'use strict';
	
	angular.module('BrsManager.users', ['ngRoute', 'ngResource'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/users/add', {
			templateUrl: 'app/users/html/add.html',
			controller: 'users.AddUserCtrl'
		})
		.when('/users/:id/edit', {
			templateUrl: 'app/users/html/add.html',
			controller: 'users.EditUserCtrl'
		})
		.when('/users', {
			templateUrl: 'app/users/html/index.html',
			controller: 'users.UsersCtrl'
		});
	}]);
	
}());