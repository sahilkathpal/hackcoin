(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	
	.factory('Workorder', function ($resource) {
		var Workorder = $resource(baseUrl + 'workorders/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Workorder;
	})

	.factory('Workorders', ['$http',function ($http) {
		
		var app = {};

		app.tasks = function (sectionId) {
			return $http.get('/sections/' + sectionId)
				.then(function (data) {
					return data.data;
				});
		};
		
		app.products = function (workorderId) {
			return $http.get('/api/workorder/' + workorderId)
				.then(function (data) {
					return data.data;
				});
		};

		app.responses = function (workorderId,taskId) {
			return $http.get('/responses?workorder_id='+workorderId+'&task_id='+taskId)
				.then(function (data) {
					return data.data;
				});
		};

		app.validate = function (workorderId, bol) {
			if(bol) var obj = {status: "complete"};
			else var obj = {status: "rejected"};
			return $http.put('/workorders/'+workorderId, obj)
			.then(function(data) {
					return data.data;
			});
		};
		return app;
	}])
	
}());