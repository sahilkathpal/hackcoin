(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard')
	.controller('dashboard.DashboardCtrl', ['$scope', '$http', 'Campaign', '$interval',

		function ($scope, $http, Campaign, $interval) {
			var baseUrl = window.location.origin + '/';

			getCampaigns();

			var intervalPromise = $interval(getCampaigns, 2000);

			function getCampaigns () {
				Campaign.query().$promise
					.then(function (data) {
						$scope.campaigns = data;
					});
			}

			$scope.$on('$destroy',function(){
			    if(intervalPromise)
			        $interval.cancel(intervalPromise);   
			});
		}

	]);
	
}());