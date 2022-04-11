<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('site_code')->unique();
            $table->string('site_id');
            $table->string('site_name');
            $table->string('site_address');
            $table->string('region_code');
            $table->string('region_name');
            $table->string('completeyear');
            $table->string('completemonth');
            $table->string('completeday');
            $table->string('capacity');
            $table->string('no_mastercontroller');
            $table->string('no_inverter');
            $table->string('lat');
            $table->string('lng');
            $table->string('operation_type')->default($value = "stationary");
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
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('sites');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
