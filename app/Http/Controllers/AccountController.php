<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AccountController extends Controller
{
    //

    public function lookUpUserModifiable($loginUserid , $userid){


        // $loginUserRoleName  = DB::table('role_user')->where('user_id', $loginUserid)->first('roleName');
        // $userRoleName       = DB::table('role_user')->where('user_id', $userid)->first('roleName');

        $loginUserRole = User::find($loginUserid)->roles()->first()->name;
        $userRole = User::find($userid)->roles()->first()->name;

        $modifiable = false;

        if($loginUserRole === 'admin'){
            if($userRole === 'admin'){
                $modifiable = true;
            }
            else if($userRole === 'manager' || $userRole === 'user'){
                $modifiable = true;
            } else {
                $modifiable = false;
            }
        } else if($loginUserRole === 'manager'){

            if($userRole === 'admin'){
                $modifiable = false;
            } else if($userRole === 'manager'){
                $modifiable = false;
            } else if($userRole === 'service_engineer' || $userRole === 'operator'){
                $modifiable = true;
            } else {
                $modifiable = false;
            }
        } else {
            $modifiable = false;
        }
        return $modifiable;
    }
}
