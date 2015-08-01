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