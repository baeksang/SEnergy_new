<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('email_hash')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('locale');
            $table->string('company');
            $table->string('office_phone')->nullable();
            $table->string('mobile_phone')->unique();
            $table->boolean('approved')->default(0)->nullable();
            $table->datetime('last_login_at')->nullable();
            $table->datetime('last_logout_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
