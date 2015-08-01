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