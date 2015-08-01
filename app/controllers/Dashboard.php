<?php

class Dashboard extends \BaseController {

	public function users()
	{
		return ['total' => User::count()];
	}

	public function properties()
	{
		return ['total' => Property::count()];
	}

}