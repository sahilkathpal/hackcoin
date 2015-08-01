(function () {
	'use strict';
	
	angular.module('BrsManager.settings', [])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/sections',{
			templateUrl: 'app/settings/html/sections/index.html',
			controller: 'settings.SectionsCtrl'
		})
		.when('/tasks', {
			templateUrl: 'app/settings/html/tasks/index.html',
			controller: 'settings.TasksCtrl'
		})
		.when('/tasks/add', {
			templateUrl: 'app/settings/html/tasks/add.html',
			controller: 'settings.AddTaskCtrl'
		})
		.when('/tasks/:id/edit', {
			templateUrl: 'app/settings/html/tasks/add.html',
			controller: 'settings.EditTaskCtrl'
		});	
	}]);
	
}());