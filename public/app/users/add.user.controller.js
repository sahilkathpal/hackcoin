(function () {
	'use strict';
	
	angular.module('BrsManager.users')
	.controller('users.AddUserCtrl', ['$scope', 'User',
		function ($scope, User) {
			$scope.msg = 'Add';
			$scope.addUser = function () {
				User.save($scope.user).$promise
					.then(function (data) {
						if (data.status) {
							$scope.user = {};
							$('#userName').focus();
							notify('User has been added.');
						} else {
							notify(data.message, 'danger');
						}
					}, function (err) {
						console.log(err);
					});
			};
		}
	])

	.controller('users.EditUserCtrl', ['$scope', 'User', '$routeParams', '$location',
		function ($scope, User, $routeParams, $location) {
			$scope.msg = 'Update';
			User.get($routeParams).$promise
				.then(function (data) {
					$scope.user = data;
				}, function (err) {
					$location.path('users');
				});
			$scope.addUser = function () {
				User.update($routeParams, $scope.user, function (data) {
					if (data.status) {
						$location.path('users');
						notify('User updated.');
					}
				});
			};

		}
	]);
	
}());