<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddCompletedRejectedAcceptedToWorkorders extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('workorders', function(Blueprint $table)
		{
			$table->enum('status', ['assigned', 'accepted', 'rejected', 'completed']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('workorders', function(Blueprint $table)
		{
			$table->removeColumn('status');
		});
	}

}
