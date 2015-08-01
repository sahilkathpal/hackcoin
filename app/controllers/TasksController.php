<?php

class TasksController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /tasks
	 *
	 * @return Response
	 */
	public function index()
	{
		return Task::all();
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /tasks
	 *
	 * @return Response
	 */
	public function store()
	{
		$task = Task::create(Input::all());
		if($task)
		{
			return ['status' => true, 'data' => $task];
		}
		else 
			return ['status' => false];
	}

	/**
	 * Display the specified resource.
	 * GET /tasks/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Task::findOrFail( $id );
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /tasks/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$task = Task::where('id', $id)->update( Input::all() );
		if($task)
		{
			$data = Task::find($id);
			return ['status' => true, 'data' => $data];
		}
		else 
			return ['status' => false];
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /tasks/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Task::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

}