(function () {
	'use strict';
	
	angular.module('BrsManager.users')
	.controller('users.UsersCtrl', ['$scope', 'User',
		function ($scope, User) {

			function getResultsPage(pageNumber) {
				var obj = {page: pageNumber};
				obj.filter = $scope.filter;
				obj.filterText = $scope.filterText;

				User.getAll(obj, function (data) {
					$scope.users = data.data;
					$scope.totalUsers = data.total;
				});
			}
			$scope.users = [];
			$scope.totalUsers = 0;
			$scope.usersPerPage = 10;
			$scope.options = [
				{name: 'Name', value: 'name'},
				{name: 'Email', value: 'email'},
				{name: 'City', value: 'city'},
				{name: 'State', value: 'state'},
				{name: 'Zip_code', value: 'zip_code'},
				{name: 'Home phone', value: 'home_phone'},
				{name: 'Cell phone', value: 'cell_phone'}
			];
			getResultsPage(1);

			$scope.pagination = {
				current: 1
			};
			$scope.pageChanged = function (newPage) {
				getResultsPage(newPage);
			};
			$scope.search = function () {
				getResultsPage(1);
			};
			$scope.deleteUser = function (user) {
				User.delete({id: user.id}, function (data) {
					if (data.status) {
						$scope.users.splice($scope.users.indexOf(user), 1);
						notify('User deleted');
					}
				});
			};
		}
	]);
	
}());