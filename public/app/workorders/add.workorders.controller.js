(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	.controller('workorders.AddWorkorderCtrl', ['$scope', 'Workorder', '$http', '$location',
		function ($scope, Workorder, $http, $location) {
			$scope.msg = 'Add';

			/* Get all the workers */
			$http.get('/workers').success(function (data) {
				$scope.workers = data;
			});

			/* Get all properties */
			$http.get('/properties').success(function (data) {
				$scope.properties = data.data;
			});

			/* Add the workorder */
			$scope.addWorkorder = function () {

				Workorder.save($scope.workorder).$promise
				.then(function (data) {
					if (data.status) {
						notify('Workorder saved');
						$location.path('/workorders/manage/'+data.data.id);
					} else {
						notify('Workorder not saved', 'danger');
					}
				})
			}

			$scope.addUnassigned = function () {
				var obj = {property_id: $scope.workorder.property_id, status: "unassigned"};
				Workorder.save(obj).$promise
				.then(function (data) {
					if (data.status) {
						notify('Workorder saved');
						$location.path('/workorders/manage/'+data.data.id);
					} else {
						notify('Workorder not saved', 'danger');
					}
				})
			}
		}
	]);
	
}());