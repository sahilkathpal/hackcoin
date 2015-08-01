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