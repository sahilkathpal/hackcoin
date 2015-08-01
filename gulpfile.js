(function () {
	
	'use strict';
	var gulp = require('gulp'),
		concat = require('gulp-concat'),
		watch = require('gulp-watch');

	gulp.task('default', ['vendor', 'styles', 'app', 'watch']);
	
	gulp.task('styles', function () {
		return gulp.src([
			'./public/bower_components/bootstrap/dist/css/bootstrap.min.css',
			'./public/bower_components/components-font-awesome/css/font-awesome.min.css',
			'./public/vendor/css/*.css'
		])
			.pipe(concat('styles.css'))
			.pipe(gulp.dest('./public/'));
	});
	
	gulp.task('vendor', function () {
		return gulp.src([
			'./public/bower_components/jquery/dist/jquery.min.js',
			'./public/bower_components/bootstrap/dist/js/bootstrap.min.js',
			'./public/bower_components/angular/angular.min.js',
			'./public/bower_components/angular-resource/angular-resource.min.js',
			'./public/bower_components/angular-route/angular-route.min.js',
			'./public/bower_components/angular-utils-pagination/dirPagination.js',
			'./public/bower_components/ng-file-upload/ng-file-upload.js',
			'./public/bower_components/lodash/dist/lodash.js',
			'./public/vendor/js/*.js'
		])
			.pipe(concat('vendor.js'))
			.pipe(gulp.dest('./public/'));
	});
	
	gulp.task('app', function () {
		return gulp.src([
			'./public/app/app.js',
			'./public/app/tool.module.js',
			'./public/app/**/*.module.js',
			'./public/app/**/*.js'
		])
			.pipe(concat('application.js'))
			.pipe(gulp.dest('./public/'));
	});
	
	gulp.task('watch', function () {
		watch('./public/app/**/*.js', function () {
			gulp.start('app');
		});
	});
	
}());