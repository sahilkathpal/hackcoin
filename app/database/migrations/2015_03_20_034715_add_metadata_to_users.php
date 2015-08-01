<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddMetadataToUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('users', function(Blueprint $table)
		{
			$table->integer('contractor_code');
			$table->integer('contractor_id');
			$table->string('address');
			$table->string('city');
			$table->string('state');
			$table->string('zip_code');
			$table->string('coverage_area');
			$table->string('home_phone');
			$table->string('cell_phone');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('users', function(Blueprint $table)
		{
			$table->dropColumn([
				'contractor_code',
				'contractor_id',
				'address',
				'state', 'city', 'zip_code',
				'coverage_area',
				'home_phone', 'cell_phone'
			]);
		});
	}

}
