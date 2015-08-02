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

		.when('/campaigns/:id', {
			templateUrl: 'app/campaigns/html/profile.html',
			controller: 'campaigns.ProfileCtrl'
		});

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
	
	angular.module('BrsManager.properties', [])
	.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
		.when('/properties/add', {
			templateUrl: 'app/properties/html/add.html',
			controller: 'properties.AddPropertyCtrl'
		})

		.when('/properties/:id/edit', {
			templateUrl: 'app/properties/html/add.html',
			controller: 'properties.EditPropertyCtrl'
		})

		.when('/properties', {
			templateUrl: 'app/properties/html/index.html',
			controller: 'properties.PropertiesCtrl'
		})

	}]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.settings', [])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/sections',{
			templateUrl: 'app/settings/html/sections/index.html',
			controller: 'settings.SectionsCtrl'
		})
		.when('/tasks', {
			templateUrl: 'app/settings/html/tasks/index.html',
			controller: 'settings.TasksCtrl'
		})
		.when('/tasks/add', {
			templateUrl: 'app/settings/html/tasks/add.html',
			controller: 'settings.AddTaskCtrl'
		})
		.when('/tasks/:id/edit', {
			templateUrl: 'app/settings/html/tasks/add.html',
			controller: 'settings.EditTaskCtrl'
		});	
	}]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.users', ['ngRoute', 'ngResource'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/users/add', {
			templateUrl: 'app/users/html/add.html',
			controller: 'users.AddUserCtrl'
		})
		.when('/users/:id/edit', {
			templateUrl: 'app/users/html/add.html',
			controller: 'users.EditUserCtrl'
		})
		.when('/users', {
			templateUrl: 'app/users/html/index.html',
			controller: 'users.UsersCtrl'
		});
	}]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.workorders', [])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider

		.when('/workorders', {
			templateUrl: 'app/workorders/html/index.html',
			controller: 'workorders.WorkordersCtrl'
		})
		.when('/workorders/add', {
			templateUrl: 'app/workorders/html/add.html',
			controller: 'workorders.AddWorkorderCtrl'
		})
		.when('/workorders/validate', {
			templateUrl: 'app/workorders/html/validate-list.html',
			controller: 'workorders.WorkorderValidateListCtrl'
		})
		.when('/workorders/validate/:id', {
			templateUrl: 'app/workorders/html/validate-products.html',
			controller: 'workorders.WorkorderValidateProductsCtrl'
		})
		.when('/workorders/manage/:id', {
			templateUrl: 'app/workorders/html/manage.html',
			controller: 'workorders.ManageWorkorderCtrl'
		})
		.when('/workorders/validate/:workorderId/:sectionId', {
			templateUrl: 'app/workorders/html/validate-tasks.html',
			controller: 'workorders.WorkorderValidateTasksCtrl'
		})
		.when('/workorders/validate/:workorderId/:taskId/responses', {
			templateUrl: 'app/workorders/html/validate-responses.html',
			controller: 'workorders.WorkorderValidateResponsesCtrl'
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
				console.log($scope.campaign);
				Campaign.save($scope.campaign, function (data) {
					if (data.status) {
						$scope.campaign = {};
						notify('Campaign has been created');
					}
				});
			};
		}
	]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.IndexCtrl', ['$scope', 'Campaign',
		function ($scope, Campaign) {
			
			Campaign.query().$promise
				.then(function (data) {
					$scope.campaigns = data;
				});

		}
	]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.campaigns')
	.controller('campaigns.ProfileCtrl', ['$scope', 'Campaign', '$routeParams', '$http', '$interval',
		function ($scope, Campaign, $routeParams, $http, $interval) {
			
			var intervalPromise;
			Campaign.get({id: $routeParams.id}).$promise
				.then(function (data) {
					$scope.campaign = data;

					setProgress();
					//repeat();
					intervalPromise = $interval(repeat, 4000);
					
				});

			function repeat () {
				$http.get('https://api.blockcypher.com/v1/btc/test3/addrs/' + $scope.campaign.address + '/balance?token=bf121c744dce06d0ec4495fac2975ce9')
					.success(function (data) {
						if (data.error) console.log(data);
						else {
							var balance = data.balance * 0.00000001;
							$scope.campaign.raised = balance;
							setProgress();
							Campaign.update({id:$routeParams.id}, {raised: balance}).$promise;
						}
					});
			}	

			function setProgress () {
				$scope.progress = (parseFloat($scope.campaign.raised)/parseFloat($scope.campaign.money)) * 100;
			}

			$scope.$on('$destroy',function(){
			    if(intervalPromise)
			        $interval.cancel(intervalPromise);   
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
/*global $, jQuery, alert, console, angular, app, google, setTimeout, window, _*/

(function () {

	'use strict';
	angular.module('BrsManager').directive( 'maps', function() {

		return {
			restrict: 'E',
			templateUrl: 'app/directives/html/maps.html',
			replace: true,
			scope: {
				classes: '@',
				styles: '@',
				proerties: '@'
			},
			link: function ($scope, el) {
				var mapOptions = {
					center: { lat: 19.106776, lng: 72.86272},
					zoom: 12
				};
				var map = new google.maps.Map(el[0], mapOptions);
				$scope.addProperties = function () {
					_.forEach($scope.properties, function (property) {
						var newPoint = new google.maps.LatLng(property.latitude, property.longitude);
						var newMarker = new google.maps.Marker({
							position: newPoint,
							map: map,
							animation: google.maps.Animation.BOUNCE
						});
					});
				};
			}
		};

	});
	
}());
/*global $, jQuery, alert, console, angular, notify*/
/*jshint -W024 */

(function () {
	'use strict';
	
	var app = angular.module('BrsManager');
	app.directive('search', function () {

		return {
			restrict: 'E',
			templateUrl: 'app/directives/html/search-filter.html',
			replace: true,
			scope: {
				options: '=options',
				filter: '=filter',
				query: '=query',
				search: '&fun'
			},
			link: function ($scope) {
				if ($scope.options.length > 0) {
					$scope.filter = $scope.options[0].value;
				}
			}
		};

	});
	
}());
/*global $, jQuery, alert, console, angular, notify*/

(function () {
	
	'use strict';
	
	angular.module('BrsManager')
		.directive('widget', ['$http', function ($http) {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'app/directives/html/widget.html',
				scope: {
					val: '@',
					text: '@',
					wc: '@',
					icon: '@',
					btn: '='
				},
				link: function (scope, el) {
					scope.val = scope.val || 0;
					scope.text = scope.text || 'Some text here..';
					scope.wc = scope.wc || 'aqua';
					scope.icon = scope.icon || 'bag';
				}
			};
		}]);
}());

(function () {
	'use strict';
	
	angular.module('BrsManager.dashboard')
	.controller('dashboard.DashboardCtrl', ['$scope', '$http', 'Campaign', '$interval',

		function ($scope, $http, Campaign, $interval) {
			var baseUrl = window.location.origin + '/';

			getCampaigns();

			var intervalPromise = $interval(getCampaigns, 2000);

			function getCampaigns () {
				Campaign.query().$promise
					.then(function (data) {
						$scope.campaigns = data;
					});
			}

			$scope.$on('$destroy',function(){
			    if(intervalPromise)
			        $interval.cancel(intervalPromise);   
			});
		}

	]);
	
}());
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
(function () {
	'use strict';
	
	angular.module('BrsManager.properties')
	.controller('properties.PropertiesCtrl', ['$scope', 'Property',
		function ($scope, Property) {
			
			$scope.showMap = false;
			var markers = [];
			
			function getResultsPage(pageNumber) {
				var obj = {
					page: pageNumber,
					filter: $scope.filter,
					filterText: $scope.filterText
				};
				Property.getAll(obj, function (data) {
					$scope.properties = data.data;
					$scope.totalProperties = data.total;
				});
			}

			$scope.options = [
				{name: 'Name', value: 'property_name'},
				{name: 'Address', value: 'property_address'},
				{name: 'City', value: 'city'},
				{name: 'State', value: 'state'},
				{name: 'Zip code', value: 'zip_code'}
			];
			$scope.properties = [];
			$scope.totalProperties = 0;
			$scope.propertiesPerPage = 10;
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
			$scope.viewOnMap = function (property) {
				window.open("https://www.google.co.in/maps/?q=" + property.latitude + "," + property.longitude);
			};
			$scope.deleteProperty = function (property) {
				Property.delete({id: property.id}, function (data) {
					if (data.status) {
						$scope.properties.splice($scope.properties.indexOf(property), 1);
						notify('Property deleted');
					} else {
						notify("Error! try again", "danger");
					}
				});
			};
			$scope.selectAll = function () {
				_.forEach($scope.properties, function (property) {
					property.checked = $scope.masterCheck;
				});		
			};
			
			$scope.plotOnMap = function () {
				$scope.showMap = !$scope.showMap;
				if (!$scope.showMap) return false;
				var coordinates = _.filter($scope.properties, function (property) {
					return property.checked;
				});
				if (coordinates.length <= 0) return;
				function setAllMap(map) {
					for (var i = 0; i < markers.length; i++) {
						markers[i].setMap(map);
					}
				}
				setAllMap(null);
				_.forEach(coordinates, function (property) {
					var newPoint = new google.maps.LatLng(property.latitude, property.longitude);
					var newMarker = new google.maps.Marker({
						position: newPoint,
						map: map,
						animation: google.maps.Animation.BOUNCE
					});
					markers.push(newMarker);
				});
				
			};
			var mapOptions = {
				center: { lat: 19.106776, lng: 72.86272},
				zoom: 12
			};
			var map = new google.maps.Map($('#map')[0], mapOptions);
		}
	]);
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.properties')
	.factory('Property', function ($resource) {
		var Property = $resource(baseUrl + 'properties/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Property;
	});
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.settings')
	
	.factory('Section', function ($resource) {
		var Section = $resource(baseUrl + 'sections/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Section;
	})

	.factory('Task', function ($resource) {
		var Task = $resource(baseUrl + 'tasks/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Task;
	});
	
}());
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
(function () {
	'use strict';
	
	angular.module('BrsManager.users')
	.factory('User', function ($resource) {
		var User = $resource(baseUrl + 'users/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return User;
	});
	
}());
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
(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	.controller('workorders.AddWorkorderCtrl', ['$scope', 'Workorder', '$http', '$location',
		function ($scope, Workorder, $http, $location) {
			$scope.msg = 'Add';

			/* Get all the workers */
			$http.get('/workers').success(function (data) {
				$scope.workers = data;
			});

			/* Get all properties */
			$http.get('/properties').success(function (data) {
				$scope.properties = data.data;
			});

			/* Add the workorder */
			$scope.addWorkorder = function () {

				Workorder.save($scope.workorder).$promise
				.then(function (data) {
					if (data.status) {
						notify('Workorder saved');
						$location.path('/workorders/manage/'+data.data.id);
					} else {
						notify('Workorder not saved', 'danger');
					}
				})
			}

			$scope.addUnassigned = function () {
				var obj = {property_id: $scope.workorder.property_id, status: "unassigned"};
				Workorder.save(obj).$promise
				.then(function (data) {
					if (data.status) {
						notify('Workorder saved');
						$location.path('/workorders/manage/'+data.data.id);
					} else {
						notify('Workorder not saved', 'danger');
					}
				})
			}
		}
	]);
	
}());
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
(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	
	.factory('Workorder', function ($resource) {
		var Workorder = $resource(baseUrl + 'workorders/:id', null,  {update: {method: 'PUT'}, getAll: {method: 'GET'}});
		return Workorder;
	})

	.factory('Workorders', ['$http',function ($http) {
		
		var app = {};

		app.tasks = function (sectionId) {
			return $http.get('/sections/' + sectionId)
				.then(function (data) {
					return data.data;
				});
		};
		
		app.products = function (workorderId) {
			return $http.get('/api/workorder/' + workorderId)
				.then(function (data) {
					return data.data;
				});
		};

		app.responses = function (workorderId,taskId) {
			return $http.get('/responses?workorder_id='+workorderId+'&task_id='+taskId)
				.then(function (data) {
					return data.data;
				});
		};

		app.validate = function (workorderId, bol) {
			if(bol) var obj = {status: "complete"};
			else var obj = {status: "rejected"};
			return $http.put('/workorders/'+workorderId, obj)
			.then(function(data) {
					return data.data;
			});
		};
		return app;
	}])
	
}());
(function () {
	'use strict';
	
	angular.module('BrsManager.workorders')
	.controller('workorders.WorkordersCtrl', ['$scope', 'Workorder',
		function ($scope, Workorder) {

			/* Options for filter dropdown */
			$scope.options = [
				{name: 'Unassigned', value: 'unassigned'},
				{name: 'Assigned', value: 'assigned'},
				{name: 'Accepted', value: 'accepted'},
				{name: 'Rejected', value: 'rejected'},
				{name: 'Completed', value: 'completed'}
			]

			$scope.filter = 'assigned';

			/* Fetch workorders for a particular page with the filter */
			function getResultsPage(pageNumber) {
				var obj = {
					page: pageNumber,
					filter: 'status',
					filterText: $scope.filter
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
			
			/* Delete the workorder */
			$scope.deleteWorkorder = function (workorder) {
				Workorder.delete({id: workorder.id}, function (data) {
					if (data.status) {
						$scope.workorders.splice($scope.workorders.indexOf(workorder), 1);
						notify('Workorder deleted');
					} else {
						notify("Error! try again", "danger");
					}
				});
			};
		
		}
	]);
	
}());
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