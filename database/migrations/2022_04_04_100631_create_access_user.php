<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('access_user', function (Blueprint $table) {
            // $table->id();
            $table->unsignedBigInteger('access_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('site_id');

            $table->string('accessName')->nullable();
            $table->string('userName')->nullable();
            $table->string('siteCode')->nullable();


            $table->timestamps();

            $table->primary(['user_id', 'access_id', 'site_id']);
            $table->foreign('access_id')->references('id')->on('accesses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('site_id')->references('id')->on('sites')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('access_user');
    }
}
