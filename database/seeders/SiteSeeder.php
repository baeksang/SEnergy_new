<?php

namespace Database\Seeders;

use App\Models\Site;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSeeder extends Seeder
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
        Site::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('access_user')->truncate();


        Site::create([
            'site_code' =>'KR410001',
            'site_id' => 'KR410001',
            'site_name'=>'용인 기술 연구소 태양광',
            'site_address'=>'덕성산단2로6번길 29',
            'region_code'=>'KR-41',
            'region_name'=>'경기도',
            'completeyear' => '2021',
            'completemonth' => '5',
            'completeday' => '13',
            'capacity'=> '27.56',
            'no_mastercontroller'=> '1',
            'no_inverter'=> '2',
            'lat'=> '37.1723073',
            'lng'=> '127.2061173',
            'operation_type'=> 'tracking',

        ]);
    }
}
