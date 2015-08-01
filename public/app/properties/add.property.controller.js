(function () {
	'use strict';
	
	angular.module('BrsManager.properties')
	.controller('properties.AddPropertyCtrl', ['$scope', 'Property',
		function ($scope, Property) {
			$scope.msg = 'Add';
			$scope.addProperty = function () {
				Property.save($scope.property, function (data) {
					if (data.status) {
						$scope.property = {};
						$('#propertyName').focus();
						notify('Property has been added.');
					}
				});
			};
		}
	])

	.controller('properties.EditPropertyCtrl', ['$scope', 'Property', '$routeParams', '$location',
		function ($scope, Property, $routeParams, $location) {
			$scope.msg = 'Update';
			$scope.property = Property.get($routeParams);
			$scope.addProperty = function () {
				Property.update($routeParams, $scope.property, function (data) {
					if (data.status) {
						$location.path('properties');
						notify('Property updated.');
					}
				});
			};
		}
	]);
	
}());