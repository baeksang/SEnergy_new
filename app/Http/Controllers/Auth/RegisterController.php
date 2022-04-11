<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\User;
use App\Models\Level;
use App\Models\Region;
use App\Mail\WelcomeEMail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()

    {
        $userRoles = array();
        $roles   = Role::where('name', '!=', 'user')->get()->toArray('name');
        $regions = Region::all()->toArray();
        foreach($roles as $key => $role) {
            $userRoles[$key]['id'] = $role['id'];
            $userRoles[$key]['name'] = $role['name'];
        }

        return view('auth.register')->with([
            'roles'     => $userRoles,
            'regions'   => $regions,
        ]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {

        return Validator::make($data, [
            'role'          => ['required', 'string'],
            'region'        => ['required', 'string'],
            'user_id'       => ['required', 'string', 'max:50', 'unique:users'],
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'      => ['required', 'string', 'min:8', 'confirmed'],
            'company'       => ['required', 'string'],
            // 'locale'        => ['required', 'string'],
            'ITU_office_phone_number'   => ['required', 'string', 'min:2', 'max:3'],
            'office_phone_number'       => ['required', 'string', 'min:7', 'max:30',],
            'mobile_phone_number'       => ['required', 'string', 'min:10', 'max:30', 'unique:users,mobile_phone'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {

        $user = User::create([
            'user_id'           => $data['user_id'],
            'name'              => $data['name'],
            'email'             => $data['email'],
            'email_hash'        => hash('sha256', $data['email']),
            'password'          => Hash::make($data['password']),
            'company'           => $data['company'],
            'locale'            => "+82",
            'office_phone'      => $data['ITU_office_phone_number'].'-'.$data['office_phone_number'],
            'mobile_phone'      => $data['mobile_phone_number'],
        ]);

        $newUserRole = Role::where('id','=', $data['role'])->first();
        $newUserRegion = Region::where('region_code','=', $data['region'])->first();

        $newUser['id']              = $user->id;
        $newUser['name']            = $data['name'];
        $newUser['user_id']         = $data['user_id'];
        $newUser['email']           = $data['email'];
        $newUser['role']            = $newUserRole->name;
        $newUser['region_name']     = $newUserRegion->region_name;

        $user->roles()->attach($newUserRole, [
            'userName'          => $data['name'],
            'roleName'          => $newUser['role'],
        ]);

        $user->regions()->attach($newUserRegion, [
                'userName'          => $data['name'],
                'regionCode'        => $newUserRegion->region_code,
                'regionName'        => $newUserRegion->region_name,
                'countryCode'       => $newUserRegion->country_code,
                'countryName'       => $newUserRegion->country_name,

        ]);

        if($newUser['role'] == "admin"){
            $newUser['level'] = "nationwide";
        } else if ($newUser['role'] == "manager"){
            $newUser['level'] = "region";
        } else if ($newUser['role'] == "service_engineer" || $newUser['role'] == "operator"){
            $newUser['level'] = "site";
        }
        $newUserLevel = Level::where('name','=', $newUser['level'])->first();
        $user->levels()->attach($newUserLevel, [
            'userName'          => $data['name'],
            'levelName'         => $newUser['level']
        ]);

        Mail::to($user->email)->send(new WelcomeEMail());


        return $user;
    }
}
