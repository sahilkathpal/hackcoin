<?php

class UsersController extends \BaseController {

	public function __construct()
	{
		$this->beforeFilter('guest', ['only' => ['getLogin', 'postLogin']]);
	}

	/**
	 * Display a listing of the resource.
	 * GET /users
	 *
	 * @return Response
	 */
	public function index()
	{
		if( Input::has('filter') && Input::has('filterText') ) {
			return User::where(Input::get( 'filter' ), 'LIKE', '%'.Input::get( 'filterText' ).'%')->paginate( 10 );
		}
		return User::paginate( 10 );
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /users
	 *
	 * @return Response
	 */
	public function store()
	{
		$userData = Input::except( ['role', 'password'] );

		$role = Input::get('role', 3);
		$password = Hash::make( Input::get( 'password' ) );
		$user = User::create( $userData );
		if( $user )
		{
			$user->role = $role;
			$user->password = $password;
			$user->save();
			return ['status' => true, 'user' => $user];
		}
		else
		{
			return ['status' => false];
		}
	}

	/**
	 * Display the specified resource.
	 * GET /users/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return User::findOrFail( $id );
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /users/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$user = User::findOrFail( $id );
		User::where('id', $id)->update( Input::except( ['password', 'role'] ) );
		if( Input::has( 'role' ) )
			$user->role = Input::get( 'role' );
		if( Input::has( 'password' ) )
			$user->password = Hash::make( Input::get('password') );
		if ( $user->save() )
			return ['status'=> true, 'user'=> $user] ;
		else
			return ['status'=> false] ;
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /users/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = User::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

	public function getLogin()
	{
		if (Auth::check()) {
			return Redirect::to('/');
		}
		return View::make('users.login');
	}

	public function postLogin()
	{
		if (Auth::check()) {
			return ['status' => false, 'message' => 'Wrong credentials. Try again'];
		}
		if( Auth::attempt(Input::only(['email', 'password']), TRUE) )
			return ['status' => true];
		else
			return ['status' => false, 'message' => 'Wrong credentials. Try again'];
	}

	public function getLogout()
	{
		Auth::logout();
		return Redirect::to('login');
	}

	public function checkauth()
	{
		if( Auth::check() )
		{
			$user = Auth::user();
			return ['status' => true, 'user' => $user];
		}
		else
			return ['status' => false];
	}

	public function postAuthMobile()
	{
		if (Auth::validate(Input::all()))
		{
			return ['status' => true, 'user' => User::where('email', Input::get('email'))->first()];
		}
		else
		{
			return ['status' => false, 'message' => 'Wrong credentials'];
		}
	}


	private function checkDuplicateEmail( $email )
	{
		$user = User::where( 'email', $email )->limit(1)->get();
		if( isset($user[0]) ) return true;
		else return false;
	}

}