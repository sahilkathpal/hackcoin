<?php

class Workorder extends \Eloquent {
	protected $guarded = ['id'];

	public function scopeAccepted($query)
	{
		return $query->where('status', 'accepted');
	}

	public function scopeRejected($query)
	{
		return $query->where('status', 'rejected');
	}

	public function scopeAssigned($query)
	{
		return $query->where('status', 'assigned');
	}

	public function sections()
	{
		return $this->belongsToMany('Section')->withPivot('description');
	}

	public function property()
	{
		return $this->belongsTo('Property');
	}

	public function user()
	{
		return $this->belongsTo('User');
	}
}