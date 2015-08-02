(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.ProfileCtrl', ['$scope', 'Campaign', '$routeParams', '$http', '$interval',
		function ($scope, Campaign, $routeParams, $http, $interval) {
			
			var intervalPromise;
			Campaign.get({id: $routeParams.id}).$promise
				.then(function (data) {
					$scope.campaign = data;

					setProgress();
					intervalPromise = $interval(repeat, 4000);
					
				});

			function repeat () {
				$http.get('https://api.blockcypher.com/v1/btc/test3/addrs/' + $scope.campaign.address + '/balance?token=bf121c744dce06d0ec4495fac2975ce9')
					.success(function (data) {
						if (data.error) console.log(data);
						else {
							var balance = data.balance * 0.00000001;
							$scope.campaign.raised = balance;
							setProgress();
							Campaign.update({id:$routeParams.id}, {raised: balance}).$promise;
						}
					});
			}	

			function setProgress () {
				$scope.progress = (parseFloat($scope.campaign.raised)/parseFloat($scope.campaign.money)) * 100;
			}

			$scope.$on('$destroy',function(){
			    if(intervalPromise)
			        $interval.cancel(intervalPromise);   
			});
			

		}
	]);
	
}());