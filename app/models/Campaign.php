<?php

class Campaign extends \Eloquent {
	protected $guarded = ['id'];

	public function user()
	{
		return $this->belongsTo('user');
	}
}