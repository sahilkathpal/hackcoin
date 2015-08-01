<?php

class SectionsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /sections
	 *
	 * @return Response
	 */
	public function index()
	{
		return Section::all();
	}



	/**
	 * Store a newly created resource in storage.
	 * POST /sections
	 *
	 * @return Response
	 */
	public function store()
	{
		$section = Section::create(Input::all());
		if ($section)
		{
			return ['status'=>true, 'data'=>$section];
		}
		else
				return ['status'=>false];
	}

	/**
	 * Display the specified resource.
	 * GET /sections/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Section::with('tasks')->find($id);
	}



	/**
	 * Update the specified resource in storage.
	 * PUT /sections/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$section = Section::where('id', $id)->update( Input::all() );
		if($section)
		{
			$data = Section::find($id);
			return ['status' => true, 'data' => $data];
		}
		else
			return ['status' => false];
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /sections/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Section::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

}