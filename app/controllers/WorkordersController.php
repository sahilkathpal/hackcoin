<?php

class WorkordersController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /workorders
	 *
	 * @return Response
	 */
	public function index()
	{
		if( Input::has("filter") && Input::has("filterText") )
		{
			return Workorder::with('property')->with('user')->where( Input::get('filter'), 'LIKE', '%'.Input::get('filterText').'%' )->paginate( 10 );
		}
		return Workorder::with('property')->with('user')->with('sections')->paginate( 10 );
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /workorders
	 *
	 * @return Response
	 */
	public function store()
	{
		if (Input::has('user_id') || Input::has('property_id'))
		{
			$workorder = Workorder::create( Input::all() );
			if( $workorder )
				return ['status' => true, 'data' => $workorder];
			else
				return ['status' => false];
		}
		else
		{
			return ['status' => false, 'message' => 'Atleast the user or property required'];
		}
	}

	/**
	 * Display the specified resource.
	 * GET /workorders/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Workorder::with('sections')->with('user')->with('property')->findOrFail( $id );
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /workorders/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$workorder = Workorder::where('id', $id)->update( Input::all() );
		if ($workorder)
			return ['status'=> true] ;
		else
			return ['status'=> false] ;
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /workorders/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Workorder::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

	public function postAttach()
	{
		if (Input::has('id') && Input::has('section_id'))
		{
			$section_id = Input::get('section_id');
			$id = Input::get('id');
			Workorder::find($id)->sections()->save(Section::find($section_id), ['description' => Input::get('description','')]);
			return ['status' => true];
		}
		else
		{
			return ['status' => false];
		}
	}

	public function postDetach()
	{
		if (Input::has('id') && Input::has('section_id'))
		{
			$section_id = Input::get('section_id');
			$id = Input::get('id');
			Workorder::find($id)->sections()->detach(Section::find($section_id));
			return ['status' => true];
		}
		else
		{
			return ['status' => false];
		}
	}

}