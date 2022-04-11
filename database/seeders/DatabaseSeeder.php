<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory(10)->create();
        $this->call(SiteSeeder::class);
        $this->call(AccessSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(LevelSeeder::class);
        $this->call(RegionSeeder::class);
        $this->call(UserSeeder::class);
        // $this->call(MCsTableSeeder::class);
        // $this->call(SwitchgearsTableSeeder::class);
        // $this->call(InvertersTableSeeder::class);
    }
}
