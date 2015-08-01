(function () {
	'use strict';
	
	angular.module('BrsManager.settings')
	
	.factory('Section', function ($resource) {
		var Section = $resource(baseUrl + 'sections/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Section;
	})

	.factory('Task', function ($resource) {
		var Task = $resource(baseUrl + 'tasks/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Task;
	});
	
}());