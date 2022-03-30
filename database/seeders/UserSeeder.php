<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
         // If you wish to truncate the entire table, which will remove all rows and reset the auto-incrementing ID to zero, you may use the truncate method:
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $admin = User::create([
            'user_id'       => 'admin',
            'name'          => 'Admin',
            'email'         => 'bshan@gsenc.com',
            'email_hash'    => hash('sha256','bshan@gsenc.com'),
            'password'      => Hash::make('password'),
            'company'       => 'GS E&C',
            'locale'        =>'KR',
            'mobile_phone'   => '01041646580',
            'approved'      => 1
        ]);
    }
}
