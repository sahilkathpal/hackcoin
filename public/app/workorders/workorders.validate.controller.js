(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	
	.controller('workorders.WorkorderValidateListCtrl', ['$scope', 'Workorder', function ($scope, Workorder) {

		/* Fetch workorders for a particular page with the filter */
		function getResultsPage(pageNumber) {
			var obj = {
				page: pageNumber,
				filter: 'status',
				filterText: 'validate'
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

	}])

	.controller('workorders.WorkorderValidateProductsCtrl', ['$scope', 'Workorders', '$routeParams', function ($scope, Workorders,$routeParams) {
		Workorders.products($routeParams.id)
		.then(handleProducts);

		function handleProducts(data) {
			$scope.workorder=data;
		}	
		

	}])

	.controller('workorders.WorkorderValidateTasksCtrl', ['$scope', 'Workorders', '$routeParams', '$location', function ($scope, Workorders,$routeParams, $location) {
		Workorders.tasks($routeParams.sectionId)
		.then(handleTasks);

		function handleTasks(data) {
			$scope.section=data;
		}	
		$scope.workorderId = $routeParams.workorderId;

		$scope.accept = function(bol) {
			Workorders.validate($scope.workorderId, bol)
			.then(function(data){
				$location.path("/workorders/validate");
			});
		}

	}])

	.controller('workorders.WorkorderValidateResponsesCtrl', ['$scope', 'Workorders', '$routeParams', '$location', function ($scope, Workorders,$routeParams, $location) {
		Workorders.responses($routeParams.workorderId, $routeParams.taskId)
		.then(handleTasks);

		function handleTasks(data) {
			$scope.beforeImages = [];
			$scope.afterImages = [];
			angular.forEach(data,function(img) {
				if(img.before_image) $scope.beforeImages.push(img);
				else $scope.afterImages.push(img);
			});
			console.log(data);
		}	
		$scope.workorderId = $routeParams.workorderId;
		$scope.sectionId = $routeParams.taskId;

		$scope.accept = function(bol) {
			Workorders.validate($scope.workorderId, bol)
			.then(function(data){
				$location.path("/workorders/validate");
			});
		}

	}]);

	
}());