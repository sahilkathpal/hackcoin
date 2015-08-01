(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.IndexCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			
			Campaign.query().$promise
				.then(function (data) {
					$scope.campaigns = data;
				});

		}
	]);
	
}());