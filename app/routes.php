<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Event::listen('illuminate.query', function($query)
// {
//     var_dump($query);
// });

Route::get('/', function()
{
	if( Auth::check() )
		return View::make('index');
	else
		return Redirect::to('login');
});

Route::get('environment', function()
{
	return App::environment();
});

Route::any('test', function()
{
	return View::make('testupload');
});

/*
 * Custom defined Routes
 *
 */

/* Session controll Routes */

Route::get('login', 'UsersController@getLogin');
Route::post('login', 'UsersController@postLogin');
Route::get('logout', 'UsersController@getLogout');
Route::get('checkauth', 'UsersController@checkauth');

/* Dashboard Routes */

Route::get('dashboard/users', 'Dashboard@users');
Route::get('dashboard/properties', 'Dashboard@properties');

/* Get unpaginated resources */

Route::get('properties/all', 'PropertiesController@all');


/* Workorders methods */

Route::post('workorders/attach', 'WorkordersController@postAttach');
Route::post('workorders/detach', 'WorkordersController@postDetach');
// Route::get('workorders/accepted', 'WorkordersController@getAccepted');
// Route::get('workorders/rejected', 'WorkordersController@getRejected');
// Route::get('workorders/assigned', 'WorkordersController@getAssigned');
Route::post('workorders/store', 'ResponsesController@store');
/* API routes */

Route::group(['prefix' => 'api'], function ()
{
	Route::get('workorders/{id}', function ($id)
	{
		$user = User::findOrFail($id);
		return $user->workorders()->with('property')->where('status', 'accepted')->get();
	});

	Route::get('workorders/assigned/{id}', function ($id)
	{
		$user = User::findOrFail($id);
		return $user->workorders()->with('property')->where('status', 'assigned')->get();
	});

	Route::get('workorder/{id}', function ($id)
	{
		return Workorder::with('sections.tasks')->find($id);
	});
	Route::get('tasks/{id}', function ($id)
	{
		return Task::where('section_id', $id)->get();
	});
	Route::post('auth/mobile', 'UsersController@postAuthMobile');
	Route::get('responses/{workorder_id}/{section_id}', 'ResponsesController@getApiResponses');
});

/*
 * Resourcefull Routes
 *
 */

Route::resource('users', 'UsersController');
Route::resource('campaigns', 'CampaignsController');