(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	.controller('workorders.WorkordersCtrl', ['$scope', 'Workorder',
		function ($scope, Workorder) {

			/* Options for filter dropdown */
			$scope.options = [
				{name: 'Unassigned', value: 'unassigned'},
				{name: 'Assigned', value: 'assigned'},
				{name: 'Accepted', value: 'accepted'},
				{name: 'Rejected', value: 'rejected'},
				{name: 'Completed', value: 'completed'}
			]

			$scope.filter = 'assigned';

			/* Fetch workorders for a particular page with the filter */
			function getResultsPage(pageNumber) {
				var obj = {
					page: pageNumber,
					filter: 'status',
					filterText: $scope.filter
				};
				Workorder.getAll(obj, function (data) {
					$scope.workorders = data.data;
					$scope.totalWorkorders = data.total;
				});
			}

			/* Meta data used for pagination */
			$scope.workorders = [];
			$scope.totalWorkorders = 0;
			$scope.workordersPerPage = 10;
			getResultsPage(1);
			$scope.pagination = {
				current: 1
			};

			/* Fetch new workorders on page change */
			$scope.pageChanged = function (newPage) {
				getResultsPage(newPage);
			};

			/* Search on changing the filter */
			$scope.search = function () {
				getResultsPage(1);
			};
			
			/* Delete the workorder */
			$scope.deleteWorkorder = function (workorder) {
				Workorder.delete({id: workorder.id}, function (data) {
					if (data.status) {
						$scope.workorders.splice($scope.workorders.indexOf(workorder), 1);
						notify('Workorder deleted');
					} else {
						notify("Error! try again", "danger");
					}
				});
			};
		
		}
	]);
	
}());