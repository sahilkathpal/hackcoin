(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.ProfileCtrl', ['$scope', 'Campaign', '$routeParams',
		function ($scope, Campaign, $routeParams) {
			
			Campaign.get({id: $routeParams.id}).$promise
				.then(function (data) {
					$scope.campaign = data;

					$scope.progress = (parseFloat($scope.campaign.raised)/parseFloat($scope.campaign.money)) * 100;
				});

		}
	]);
	
}());