(function () {
	'use strict';
	
	angular.module('BrsManager', [
		'ngRoute',
		'ngResource',
		'angularUtils.directives.dirPagination',
		'BrsManager.properties',
		'BrsManager.users',
		'BrsManager.workorders',
		'BrsManager.settings',
		'BrsManager.dashboard'
	])

	.controller('MainCtrl', ['Auth', '$scope', '$location',
		function (Auth, $scope, $location) {

			var auth = Auth.check();
			auth
				.then(function (data) {
					if (data.status) {
						$scope.active_user_profile = data.user;
					} else {
						window.location.href = baseUrl + "login";
					}
				})
				.catch(function (err) {
					console.log(err);
				});

			$scope.goBack = function (loc) {
				$location.path(loc || '/');
			};

		}
	])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/'
			});
	}])

	.factory('Auth', function ($http, $q) {
		return {
			status: {
				status: null,
				user: null
			},
			check: function () {
				var deferred = $q.defer(),
					th = this;
				if (th.status.status === null) {
					$http.get(baseUrl + 'checkauth')
						.success(function (data) {
							if (data.status) {
								th.status.status = true;
								th.status.user = data.user;
								deferred.resolve(th.status);
							} else {
								th.status.status = false;
								deferred.resolve(th.status);
							}
						});
				} else {
					deferred.resolve(th.status);
				}
				return deferred.promise;
			}
		};
	});
	
}());