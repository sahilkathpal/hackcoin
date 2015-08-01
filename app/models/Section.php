<?php

class Section extends \Eloquent {
	protected $guarded = ["id"];

	public function workorders()
	{
		return $this->belongsToMany('Workorder');
	}

	public function tasks()
	{
		return $this->hasMany('Task');
	}
}