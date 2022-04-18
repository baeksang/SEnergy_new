<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use App\Models\Level;
use App\Models\Access;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\UserCollection;
use App\Http\Controllers\AccountController;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->account = new AccountController;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        // 로그인 회원의 회원 정보 조회 권한을 조회한다
        // 1. 로그인 유저가 'admin' 이면 모든 회원을 조회할 권한을 갖는다
        // 2. 로그인 유저가 'manager' 이면 ' 'admin'을 제외한 모든 회원을 조회할 권한을 갖는다.
        // 3. 그 외의 유저는 회원을 조회할 수 없다.


        if (Gate::allows('admin') && Gate::denies('manager')){
            $users = UserResource::collection(User::all());
        } else if(Gate::denies('admin') && Gate::allows('manager')){
            $admin_id = Role::where('name', 'admin')->first('id')->toArray();
            $arr = [];
            $users_id = DB::table('role_user')
                        ->whereNotIn('role_id', $admin_id)
                        ->distinct()
                        ->get('user_id');

            foreach ($users_id as $user_id){
                $id = get_object_vars($user_id);
                array_push($arr, $id['user_id']);
            }
            $users = User::where('id', $arr)->get();
        } else {
            return view('/');
        }

        return view('admin.users.index')->with('users', $users);
        // if(isset($users)){
        //     return view('admin.users.index')->with('users', $users);
        // } else {
        //     $errorMsg = "권한을 관리할 사용자가 존재하지 않습니다.";
        //     return view('admin.users.index')->with('message', $errorMsg);
        // }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 먼저 선택한 회원에 대하여 권한이 어느 정도 인지 확인한다.
        // 1. 로그인 회원의 권한 조회
        // 2. 선택한 회원의 권한 조회
        // 3. 1번과 2번의 권한을 비교하여 수정 권한을 결정한다.

        $loginUserid = Auth::id();
        // $loginUserRole1 = DB::table('role_user')->where('user_id',$loginUserid)->first();
        $loginUserRole = User::find($loginUserid)->roles()->first()->name;

        $modifiable     = $this->account->lookUpUserModifiable($loginUserid, $id);

        // 접속한 회원이 부여할 수 있는 role에 대해서만 반환
        $roles = Role::where('control_by', $loginUserRole)->get()->toArray();
        $levels     = Level::all()->toArray();
        $accesses   = Access::all()->toArray();
        $sites      = Site::all()->toArray();
        $regions    = Region::all()->toArray();

        $userRole           = User::find($id)->roles()->first()->toArray();
        $userRegions        = User::find($id)->regions()->get()->toArray();
        $userLevel          = User::find($id)->levels()->first()->toArray();
        $userAccesses       = User::find($id)->accesses()->get()->toArray();

        if ($userLevel['name'] === "nationwide") {
            $userLevel['kname'] = "전국관리자";
        }  elseif ($userLevel['name'] === "region"){
            $userLevel['kname'] = "지역관리자";
        } else {
            $userLevel['kname'] = "현장관리자";
        }

        if($userAccesses  != null  ){

            foreach($userAccesses  as $s)
            {
                $site_id = $s['pivot']['site_id'];
                $access_id = $s['pivot']['access_id'];
                $accessName = $s['pivot']['accessName'];

                $accessNames[$site_id][$access_id] = $accessName;
                $userSites[$site_id] = Site::where('id', '=', $site_id)->first()->toArray();
            }

            foreach($accessNames as $key => $accessName)
            {
                $userSites[$key]['accessName'] = $accessName;
            }

        } else {

          $userAccesses = [];
          $userSites = [];
        }

        // dd($userRole['id']);
        // dd($userLevel);
        // dd($userRegions);
        // dump($userAccesses);
        // dd($userSites);

        $user = User::where('id',$id)->first();
        return view('admin.users.show')->with([
            'user'              => $user,
            'userRole'          => $userRole,
            'userLevel'         => $userLevel,
            'userRegions'       => $userRegions,
            'userAccesses'      => $userAccesses,
            'userSites'         => $userSites,
            'modifiable'        => $modifiable,
            // 'loginUserRegions'  => $loginUserRegions,
            'loginUserRole'     => $loginUserRole,
            'roles'             => $roles,
            'levels'            => $levels,
            'accesses'          => $accesses,
            'sites'             => $sites,
            'regions'           => $regions,
        ]);

        // return view('admin.users.show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->validate($request, [
            "approvalCheckbox" => 'required',
            "roles" => 'required',
        ]);

        return back();
        dump($id);
        dd($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }



}
