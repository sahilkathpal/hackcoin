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
		return Campaign::with('user')->get();
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /campaigns
	 *
	 * @return Response
	 */
	public function store()
	{
		$data = Input::all();
		$data['user_id'] = Auth::user()->id;
		$campaigns = Campaign::create( $data );
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
		return Campaign::with('user')->findOrFail($id);
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