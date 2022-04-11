<?php

namespace Database\Seeders;

use App\Models\Access;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Access::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('access_user')->truncate();


        Access::create(['name' => 'monitoring']);
        Access::create(['name' => 'control']);
        Access::create(['name' => 'subscribe']);
    }
}
