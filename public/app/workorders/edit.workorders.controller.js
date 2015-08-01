(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	.controller('workorders.ManageWorkorderCtrl', ['$scope', 'Workorder', 'Section', '$routeParams', '$http',
		function ($scope, Workorder, Section, $routeParams, $http) {

			/* Get the current workorder details */
			Workorder.get($routeParams).$promise
			.then(function (data) {
				$scope.taskSections = data.sections;
				$scope.workorder = data;
			})
			.catch(function (err) {
				console.log(err);
			});

			/* Get the list of sections to add to the workorder */
			Section.query(function (data) {
				$scope.sections = data;
			});

			/* Add a task to this workorder */
			$scope.addTask = function () {
				var obj = {
					section_id: $scope.tso.section.id,
					description: $scope.tso.description,
					id: $routeParams.id
				}
				$http.post('/workorders/attach', obj)
				.success(function (data) {
					if (data) {
						$scope.tso.section.pivot = {};
						$scope.tso.section.pivot.description = $scope.tso.description;
						$scope.taskSections.push($scope.tso.section);
						$scope.tso = {};
					} else {
						notify('Task not added', 'danger');
					}
				});
			}

			/* Delete task assigned to this workorder */
			$scope.detach = function (section) {
				var obj = {
					id: $routeParams.id,
					section_id: section.id
				}
				$http.post('/workorders/detach', obj)
				.success(function (data) {
					if (data) {
						$scope.taskSections.splice($scope.taskSections.indexOf(section), 1);
						notify('Task deleted');
					} else {
						notify('Task not deleted', 'danger');
					}
				});
			}
		}
	]);
	
}());