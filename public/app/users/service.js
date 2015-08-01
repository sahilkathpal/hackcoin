(function () {
	'use strict';
	
	angular.module('BrsManager.users')
	.factory('User', function ($resource) {
		var User = $resource(baseUrl + 'users/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return User;
	});
	
}());