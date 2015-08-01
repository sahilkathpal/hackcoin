(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.AddCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			$scope.msg = 'Add';
			$scope.addCampaign = function () {
				Campaign.save($scope.Campaign, function (data) {
					if (data.status) {
						$scope.Campaign = {};
						$('#CampaignName').focus();
						notify('Campaign has been added.');
					}
				});
			};
		}
	]);
	
}());