<?php

class Property extends \Eloquent {
	protected $guarded = ['id'];

	public function workorders()
	{
		return $this->hasMany('Workorder');
	}
}