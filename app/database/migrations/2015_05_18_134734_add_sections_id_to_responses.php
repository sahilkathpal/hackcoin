<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddSectionsIdToResponses extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('responses', function(Blueprint $table)
		{
			$table->integer('section_id');	
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
			$table->removeColumn('section_id');
		});
	}

}
