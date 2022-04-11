<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegionUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('region_user', function (Blueprint $table) {
            // $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('region_id');

            $table->string('userName')->nullable();
            $table->string('regionCode')->nullable();
            $table->string('regionName')->nullable();
            $table->string('countryCode')->nullable();
            $table->string('countryName')->nullable();

            $table->timestamps();

            $table->primary(['user_id', 'region_id']);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('region_user');
    }
}
