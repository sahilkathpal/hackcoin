<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddGeoToResponses extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('responses', function(Blueprint $table)
		{
			$table->string('lat');
			$table->string('longi');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('responses', function(Blueprint $table)
		{
			$table->removeColumn('lat');
			$table->removeColumn('longi');
		});
	}

}
