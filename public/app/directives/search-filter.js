/*global $, jQuery, alert, console, angular, notify*/
/*jshint -W024 */

(function () {
	'use strict';
	
	var app = angular.module('BrsManager');
	app.directive('search', function () {

		return {
			restrict: 'E',
			templateUrl: 'app/directives/html/search-filter.html',
			replace: true,
			scope: {
				options: '=options',
				filter: '=filter',
				query: '=query',
				search: '&fun'
			},
			link: function ($scope) {
				if ($scope.options.length > 0) {
					$scope.filter = $scope.options[0].value;
				}
			}
		};

	});
	
}());