<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
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
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Role::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        DB::table('role_user')->truncate();

        $roles = array();
        $role = [];

        $roles[0]   = [ 'name' => 'admin',            'control_by'=>'admin'    ];
        $roles[1]   = [ 'name' => 'manager',          'control_by'=>'admin',   ];
        $roles[2]   = [ 'name' => 'service_engineer', 'control_by'=>'manager', ];
        $roles[3]   = [ 'name' => 'operator',         'control_by'=>'manager', ];
        $roles[4]   = [ 'name' => 'user',             'control_by'=>'admin',   ];

        foreach($roles as $role){
            Role::create($role);
        }
    }
}
