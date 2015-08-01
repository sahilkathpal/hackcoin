/*global $, jQuery, alert, console, angular*/
/*jslint browser: true */

var baseUrl = window.location.origin + '/';
function notify(msg, status, time) {
	'use strict';
	
	if (!status) {
		status = 'success';
	}
	if (!time) {
		time = 3000;
	}
	var clas = "alert-" + status;
	$('#flash > div').removeClass('alert-success');
	$('#flash > div').removeClass('alert-danger');
	$('#flash > div').addClass(clas);
	$('#flashMessage').text(msg);
	$('#flash').show();
	setTimeout(
		function () { $('.close').click(); },
		time
	);
}
(function () {
	
	'use strict';
	
	$(document).ready(function () {
		$('.close').click(function (e) {
			$('#flash').hide();
		});
	});

}());
(function () {
	'use strict';
	
	angular.module('BrsManager', [
		'ngResource',
		'ngRoute',
		'BrsManager.campaigns',
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
(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns', [])
	.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
		.when('/campaigns/add', {
			templateUrl: 'app/campaigns/html/add.html',
			controller: 'campaigns.AddCtrl'
		})

		.when('/campaigns', {
			templateUrl: 'app/campaigns/html/index.html',
			controller: 'campaigns.IndexCtrl'
		})

	}]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'app/dashboard/html/index.html',
			controller: 'dashboard.DashboardCtrl'
		});
	}]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.AddCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			$scope.msg = 'Add';
			$scope.addCampaign = function () {
				Campaign.save($scope.Campaign, function (data) {
					if (data.status) {
						$scope.Campaign = {};
						$('#CampaignName').focus();
						notify('Campaign has been added.');
					}
				});
			};
		}
	]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.PropertiesCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			
			Campaign.getAll(obj, function (data) {
				$scope.campaigns = data.data;
			});

		}
	]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.factory('Campaign', function ($resource) {
		var Campaign = $resource(baseUrl + 'campaigns/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Campaign;
	});
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard')
	.controller('dashboard.DashboardCtrl', ['$scope', '$http',

		function ($scope, $http) {
			var baseUrl = window.location.origin + '/';
			$scope.users= [];
			$scope.properties = [];
		}

	]);
	
}());