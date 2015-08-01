(function () {
	'use strict';
	
	angular.module('BrsManager.settings')
	.controller('settings.SectionsCtrl', ['$scope', 'Section',
		function ($scope, Section) {
			$scope.msg = "Add";
			$scope.sec = {};

			Section.query(function(data){
				$scope.sections=data;
			});

			$scope.addSection = function () {
				if ($scope.msg=="Add") {
					Section.save($scope.sec, function(data){
						if(data.status)
						{
							$scope.sections.push(data.data);
						}
						else
						{
							notify("Section not added.","danger");
						}
					});
				}
				else
				{
					delete $scope.sec.$$index;
					Section.update({id:$scope.sec.id},$scope.sec,function(data){
						if(data.status)
						{
							var index = $scope.sections.indexOf($scope.tempSec);
							$scope.sections.splice(index, 1, data.data);
							$scope.clear();
						}
						else
							notify("Section not updated", "danger");
					});
				}
					

			}

			$scope.update = function(section){
				$scope.sec=angular.copy(section);
				$scope.tempSec=section;
				$scope.msg="Update";

			}

			$scope.clear = function(){
				$scope.sec={};
				$scope.msg="Add";				
			}
			$scope.delete = function(section){
				$scope.tempSec=section;
				Section.delete({id:section.id}, function(data){
					if (data.status)
					{
						var index = $scope.sections.indexOf($scope.tempSec);
						$scope.sections.splice(index,1);
					}						
					else
						notify("Section not deleted","danger");
				});
			}	
		}
	]);
	
}());