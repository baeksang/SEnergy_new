<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Level::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('level_user')->truncate();

        Level::create(['name' => 'nationwide']);
        Level::create(['name' => 'region']);
        Level::create(['name' => 'site']);
    }
}
