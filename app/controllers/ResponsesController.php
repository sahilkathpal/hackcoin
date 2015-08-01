<?php

class ResponsesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /responses
	 *
	 * @return Response
	 */
	public function index()
	{
		if(Input::has('workorder_id') && Input::has('task_id'))
		{
			return Responses::where('workorder_id', Input::get('workorder_id'))
			->where('task_id', Input::get('task_id'))
			->get();
		}
		else
		{
			return Response::json("Incomplete data", 500);
		}
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /responses
	 *
	 * @return Response
	 */
	public function store()
	{
		if (Input::hasFile('file'))
		{
			$name = Input::get('nam', time().'.'.Input::file('file')->getClientOriginalExtension());
			$path = public_path().'/downloads/'.Input::get('workorder_id').'/';
			$this->fixPath($path);
			if (Input::file('file')->move($path, $name))
			{
				$res = Responses::create(Input::except('name', 'file'));
				return Input::get('name');
			}
			else
			{
				return 'Unable to move file';		
			}
		}
		return 'Some error has occured';
	}

	/**
	 * Display the specified resource.
	 * GET /responses/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Responses::all();
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /responses/{id}/edit
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
	 * PUT /responses/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$responses = Responses::where('id', $id)->update( Input::all() );
		if ($responses)
			return ['status'=> true, 'data'=> $responses] ;
		else
			return ['status'=> false] ;
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /responses/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$status = Responses::destroy( $id );
		return $status ? ['status' => true] : ['status' => false];
	}

	// private function makeResponseObject($name)
	// {
	// 	$obj = Input::except('file', 'type');
	// 	if (Input::get('type') == 'before')
	// 	{
	// 		$obj['before_image'] = $name;
	// 	}
	// 	else
	// 	{
	// 		$obj['after_image'] = $name;
	// 	}
	// 	return $obj;
	// }

	private function fixPath($path)
	{
		if (!File::exists($path))
		{
			File::makeDirectory($path, 0777, true);
		}
	}

	public function getApiResponses($workorder_id, $section_id)
	{
		return Responses::where('workorder_id', $workorder_id)
			->where('section_id', $section_id)
			->get();
	}

}