<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionSeeder extends Seeder
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
        Region::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('region_user')->truncate();

        $regions = array();
        $region = [];

        $regions[0]     = [ 'region_code' => 'KR-00', 'region_code2' => 'KR', 'region_name'=>'전국',        'lat'=>'37.5687838', 'lng'=>'126.9868358', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[1]     = [ 'region_code' => 'KR-11', 'region_code2' => 'SU', 'region_name'=>'서울특별시',  'lat'=>'37.5687838', 'lng'=>'126.9868358', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[2]     = [ 'region_code' => 'KR-26', 'region_code2' => 'BS', 'region_name'=>'부산광역시',  'lat'=>'35.0987929', 'lng'=>'129.1205524', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[3]     = [ 'region_code' => 'KR-27', 'region_code2' => 'DG', 'region_name'=>'대구광역시',  'lat'=>'35.8889988', 'lng'=>'128.6430073', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[4]     = [ 'region_code' => 'KR-28', 'region_code2' => 'IC', 'region_name'=>'인천광역시',  'lat'=>'37.4611502', 'lng'=>'126.7154701', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[5]     = [ 'region_code' => 'KR-29', 'region_code2' => 'GJ', 'region_name'=>'광주광역시',  'lat'=>'35.1597711', 'lng'=>'126.8515216', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[6]     = [ 'region_code' => 'KR-30', 'region_code2' => 'DJ', 'region_name'=>'대전광역시',  'lat'=>'36.2959961', 'lng'=>'127.400154', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[7]     = [ 'region_code' => 'KR-31', 'region_code2' => 'US', 'region_name'=>'울산광역시',  'lat'=>'35.5394773', 'lng'=>'129.3112994', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[8]     = [ 'region_code' => 'KR-41', 'region_code2' => 'GG', 'region_name'=>'경기도',      'lat'=>'37.2694380', 'lng'=>'127.1621170', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[9]     = [ 'region_code' => 'KR-42', 'region_code2' => 'GW', 'region_name'=>'강원도',      'lat'=>'37.8853990', 'lng'=>'127.7297500', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[10]    = [ 'region_code' => 'KR-43', 'region_code2' => 'CB', 'region_name'=>'충청북도',    'lat'=>'36.7067375', 'lng'=>'127.6575839', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[11]    = [ 'region_code' => 'KR-44', 'region_code2' => 'CN', 'region_name'=>'충청남도',    'lat'=>'36.5117326', 'lng'=>'126.9538758', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[12]    = [ 'region_code' => 'KR-45', 'region_code2' => 'JB', 'region_name'=>'전라북도',    'lat'=>'35.8203294', 'lng'=>'127.1087840', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[13]    = [ 'region_code' => 'KR-46', 'region_code2' => 'JN', 'region_name'=>'전라남도',    'lat'=>'35.8203294', 'lng'=>'127.1087840', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[14]    = [ 'region_code' => 'KR-47', 'region_code2' => 'GB', 'region_name'=>'경상북도',    'lat'=>'36.5785551', 'lng'=>'128.9048798', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[15]    = [ 'region_code' => 'KR-48', 'region_code2' => 'GN', 'region_name'=>'경상남도',    'lat'=>'35.3936568', 'lng'=>'128.2300568', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[16]    = [ 'region_code' => 'KR-49', 'region_code2' => 'JJ', 'region_name'=>'제주도',      'lat'=>'35.8203294', 'lng'=>'127.1087840', 'country_code' => 'KR', 'country_name' => '대한민국'    ];
        $regions[17]    = [ 'region_code' => 'KR-50', 'region_code2' => 'SJ', 'region_name'=>'세종시',      'lat'=>'35.8203294', 'lng'=>'127.1087840', 'country_code' => 'KR', 'country_name' => '대한민국'    ];

        foreach($regions as $region){
            Region::create($region);
        }
    }
}
