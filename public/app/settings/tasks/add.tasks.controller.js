(function () {
	'use strict';
	
	angular.module('BrsManager.settings')
	.controller('settings.AddTaskCtrl', ['$scope', 'Task', 'Section', 
		function($scope, Task, Section) {
			$scope.msg = "Add";
			$scope.tas = {};
			$scope.tas.yn = 1;
			$scope.tas.qty = 1;
			$scope.tas.location = 1;


			Section.query(function(data){
				$scope.sections = data;
				$scope.tas.section_id = data[0].id;
			});

			$scope.addTask = function(){
					Task.save($scope.tas, function(data){
						if(data.status)
						{
							notify("Task successfully created");
							$scope.clear();
							$('#taskName').focus();
						}
						else
							notify("Task not created", "danger");
					});
			}

			$scope.clear = function(){
				$scope.tas.task_name = '';		
				$scope.tas.description = '';		
				$scope.tas.before_image = 0;
				$scope.tas.after_image = 0;
			}	
	}])

	.controller('settings.EditTaskCtrl', ['$scope', 'Task', 'Section', '$routeParams', '$location',
		function($scope, Task, Section, $routeParams, $location) {
			$scope.msg = "Update";

			Section.query(function(data){
				$scope.sections = data;	
			});

			Task.get($routeParams, function(data){
				if(data)
				{
					$scope.tas = data;
				}
				else
				{
					$location.path('tasks');
				}
			});
				

			$scope.addTask = function() {
				console.log($scope.tas);
				Task.update($routeParams, $scope.tas).$promise
				.then(function (data) {
					if(data.status)
						$location.path("tasks");
					else
						notify("Task not updated.");
						// notify("Task updated");
				},function (err) {
					notify("Task error not updated");
				});
			}
			
			
			
	}]);
	
}());