<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use App\Models\Level;
use App\Models\Access;
use App\Models\Region;
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

        DB::table('role_user')->truncate();
        DB::table('region_user')->truncate();
        DB::table('level_user')->truncate();
        DB::table('access_user')->truncate();
        DB::table('site_user')->truncate();

        $adminRole              = Role::where('name', 'admin')->first();
        $managerRole            = Role::where('name', 'manager')->first();
        $serviceEngineerRole    = Role::where('name', 'service_engineer')->first();
        $operatorRole           = Role::where('name', 'operator')->first();
        $userRole               = Role::where('name', 'user')->first();


        $admin = User::create([
            'user_id'       => 'admin',
            'name'          => 'David',
            'email'         => 'bshan@gsenc.com',
            'email_hash'    => hash('sha256','bshan@gsenc.com'),
            'password'      => Hash::make('password'),
            'company'       => 'GS E&C',
            'locale'        =>'KR',
            'office_phone'  => '0221546589',
            'mobile_phone'   => '01041646580',
            'approved'      => 1
        ]);

        $admin->roles()->attach($adminRole,[
            'userName'          => $admin['name'],
            'roleName'          => $adminRole['name'],
        ]);

        $region = Region::where('region_code', 'KR-00' )->first();
        $admin->regions()->attach($region, [
            'userName'      => $admin['name'],
            'regionCode'    => $region->region_code,
            'regionName'    => $region->region_name,
            'countryCode'   => $region->country_code,
            'countryName'   => '대한민국',
        ]);

        $level = Level::where('name', 'nationwide')->first();
        $admin->levels()->attach($level,[
            'userName'      => $admin['name'],
            'levelName'     => $level->name,
        ]);

        $site = Site::find(1);
        $monitoringAccess   = Access::where('name', 'monitoring')->first();
        $controlAccess      = Access::where('name', 'control')->first();
        $subscribeAccess    = Access::where('name', 'subscribe')->first();

        $admin->accesses()->attach($monitoringAccess, [
            'site_id'       => $site['id'],
            'accessName'    =>'monitoring',
            'userName'      => $admin['name'],
            'siteCode'      => $site['site_code']
        ]);
        $admin->accesses()->attach($controlAccess, [
            'site_id'       => $site['id'],
            'accessName'    =>'control',
            'userName'      => $admin['name'],
            'siteCode'      => $site['site_code']
        ]);
        $admin->accesses()->attach($subscribeAccess, [
            'site_id'       => $site['id'],
            'accessName'    =>'subscribe',
            'userName'      => $admin['name'],
            'siteCode'      => $site['site_code']
        ]);

        $admin->sites()->attach($site, [
            'access_id' => $monitoringAccess['id'],
            'userName'  => $admin['name'],
            'siteCode'  => $site['site_code'],
            'accessName' => $monitoringAccess['name']
        ]);

        $admin->sites()->attach($site, [
            'access_id' => $controlAccess['id'],
            'userName'  => $admin['name'],
            'siteCode'  => $site['site_code'],
            'accessName' => $controlAccess['name']
        ]);

         $admin->sites()->attach($site, [
            'access_id' => $subscribeAccess['id'],
            'userName'  => $admin['name'],
            'siteCode'  => $site['site_code'],
            'accessName' => $subscribeAccess['name']
        ]);
    }
}
