<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSectionWorkorderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('section_workorder', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('section_id')->unsigned()->index();
			$table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
			$table->integer('workorder_id')->unsigned()->index();
			$table->foreign('workorder_id')->references('id')->on('workorders')->onDelete('cascade');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('section_workorder');
	}

}
