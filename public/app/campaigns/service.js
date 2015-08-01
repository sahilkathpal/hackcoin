(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.factory('Campaign', function ($resource) {
		var Campaign = $resource(baseUrl + 'campaigns/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Campaign;
	});
	
}());