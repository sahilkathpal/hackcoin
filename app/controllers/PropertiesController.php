<?php

class PropertiesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /properties
	 *
	 * @return Response
	 */
	public function index()
	{
		if( Input::has("filter") && Input::has("filterText") )
		{
			return Property::where( Input::get('filter'), 'LIKE', '%'.Input::get('filterText').'%' )->paginate( 10 );
		}
		return Property::paginate( 10 );
	}

	public function all()
	{
		return Property::all();
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /properties
	 *
	 * @return Response
	 */
	public function store()
	{
		$property = Property::create( Input::all() );
		if( $property )
			return ['status' => true, 'property' => $property];
		else
			return ['status' => false];
	}

	/**
	 * Display the specified resource.
	 * GET /properties/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		if (Input::has('workorders'))
			return Property::with('workorders.user')->with('workorders.property')->findOrFail( $id );
		else
			return Property::findOrFail( $id );
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /properties/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$property = Property::where('id', $id)->update( Input::all() );
		if ($property)
			return ['status'=> true, 'property'=> $property] ;
		else
			return ['status'=> false] ;
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /properties/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Property::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

}