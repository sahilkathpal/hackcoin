(function () {
	'use strict';
	
	angular.module('BrsManager.workorders', [])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider

		.when('/workorders', {
			templateUrl: 'app/workorders/html/index.html',
			controller: 'workorders.WorkordersCtrl'
		})
		.when('/workorders/add', {
			templateUrl: 'app/workorders/html/add.html',
			controller: 'workorders.AddWorkorderCtrl'
		})
		.when('/workorders/validate', {
			templateUrl: 'app/workorders/html/validate-list.html',
			controller: 'workorders.WorkorderValidateListCtrl'
		})
		.when('/workorders/validate/:id', {
			templateUrl: 'app/workorders/html/validate-products.html',
			controller: 'workorders.WorkorderValidateProductsCtrl'
		})
		.when('/workorders/manage/:id', {
			templateUrl: 'app/workorders/html/manage.html',
			controller: 'workorders.ManageWorkorderCtrl'
		})
		.when('/workorders/validate/:workorderId/:sectionId', {
			templateUrl: 'app/workorders/html/validate-tasks.html',
			controller: 'workorders.WorkorderValidateTasksCtrl'
		})
		.when('/workorders/validate/:workorderId/:taskId/responses', {
			templateUrl: 'app/workorders/html/validate-responses.html',
			controller: 'workorders.WorkorderValidateResponsesCtrl'
		});
	}]);
	
}());