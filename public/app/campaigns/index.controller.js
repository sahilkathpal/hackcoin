(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.PropertiesCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			
			Campaign.getAll(obj, function (data) {
				$scope.campaigns = data.data;
			});

		}
	]);
	
}());