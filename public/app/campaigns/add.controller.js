(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.AddCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			$scope.msg = 'Add';
			$scope.addCampaign = function () {
				console.log($scope.campaign);
				Campaign.save($scope.campaign, function (data) {
					if (data.status) {
						$scope.campaign = {};
						notify('Campaign has been created');
					}
				});
			};
		}
	]);
	
}());