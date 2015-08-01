(function () {
	'use strict';
	
	angular.module('BrsManager.properties')
	.factory('Property', function ($resource) {
		var Property = $resource(baseUrl + 'properties/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Property;
	});
	
}());