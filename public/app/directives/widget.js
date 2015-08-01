/*global $, jQuery, alert, console, angular, notify*/

(function () {
	
	'use strict';
	
	angular.module('BrsManager')
		.directive('widget', ['$http', function ($http) {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'app/directives/html/widget.html',
				scope: {
					val: '@',
					text: '@',
					wc: '@',
					icon: '@',
					btn: '='
				},
				link: function (scope, el) {
					scope.val = scope.val || 0;
					scope.text = scope.text || 'Some text here..';
					scope.wc = scope.wc || 'aqua';
					scope.icon = scope.icon || 'bag';
				}
			};
		}]);
}());
