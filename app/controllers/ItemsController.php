<?php

class ItemsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /items
	 *
	 * @return Response
	 */
	public function index()
	{
		return Item::where( 'name', 'LIKE', '%'.Input::get('filter').'%' )->get();
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /items
	 *
	 * @return Response
	 */
	public function store()
	{
		return Item::create( Input::all() );
	}

	/**
	 * Display the specified resource.
	 * GET /items/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Item::findOrFail( $id );
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /items/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$item = Item::where('id', $id)->update( Input::all() );
		if ($item)
			return ['status'=> true, 'item'=> $item] ;
		else
			return ['status'=> false] ;
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /items/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Item::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

}