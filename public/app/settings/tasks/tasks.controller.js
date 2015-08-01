(function () {
	'use strict';
	
	angular.module('BrsManager.settings')
	.controller('settings.TasksCtrl', ['$scope', 'Task', '$routeParams', '$location',
		function($scope, Task, $routeParams, $location) {
			$scope.msg = "View";

			Task.query(function(data){
				$scope.tasks = data;
			});

			$scope.edit = function(id){
				$location.path('tasks/'+id+'/edit');
			}

			$scope.delete = function(task){
				Task.delete({id: task.id}, function(data){
					if(data.status)
					{
						$scope.tasks.splice($scope.tasks.indexOf(task), 1);
						notify('Task deleted');
					}
				});
			}
		
	}]);
	
}());