<?php

class CampaignsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /campaigns
	 *
	 * @return Response
	 */
	public function index()
	{
		if( Input::has("filter") && Input::has("filterText") )
		{
			return Campaign::where( Input::get('filter'), 'LIKE', '%'.Input::get('filterText').'%' )->paginate( 10 );
		}
		return Campaign::paginate( 10 );
	}

	/**
	 * Show the form for creating a new resource.
	 * GET /campaigns/create
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /campaigns
	 *
	 * @return Response
	 */
	public function store()
	{
		$campaigns = Campaign::create( Input::all() );
		if( $campaigns )
			return ['status' => true, 'data' => $campaigns];
		else
			return ['status' => false];
	}

	/**
	 * Display the specified resource.
	 * GET /campaigns/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Campaign::all();
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /campaigns/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /campaigns/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$campaigns = Campaign::where('id', $id)->update( Input::all() );
		if ($campaigns)
			return ['status'=> true, 'data'=> $campaigns] ;
		else
			return ['status'=> false] ;
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /campaigns/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Campaign::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

}