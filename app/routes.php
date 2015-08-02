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
	return Input::all();
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


/*
 * Resourcefull Routes
 *
 */

Route::resource('users', 'UsersController');
Route::resource('campaigns', 'CampaignsController');