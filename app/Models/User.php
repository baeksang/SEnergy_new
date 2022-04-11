<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Site;
use App\Models\Level;
use App\Models\Access;
use App\Models\Region;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'email_hash',
        'password',
        'locale',
        'company',
        'office_phone',
        'mobile_phone',
        'last_login_at',
        'last_logout_at',
        'last_login_ip',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime:d-M-Y'
    ];

    // public function setEmailAttribute($value){
    //     $this->attributes['email'] = Crypt::encrypt($value);
    // }

    // public function getEmailAttribute($value){
    //     try {
    //         return Crypt::decrypt($value);
    //     } catch (\Throwable $th) {
    //         return $value;
    //         // return 'non encrypted email';
    //     }
    // }

    public function roles(){
        return $this->belongsToMany(Role::class)
                    ->withTimestamps()
                    ->withPivot([
                        'userName',
                        'roleName'
                    ]);
    }

    // to use GATE
    public function hasAnyRoles($roles)
    {
        if($this->roles()->whereIn('name', $roles)->first())
        {
            return true;
        }

        return false;
    }

    // to use GATE
    public function hasRole($role)
    {
        if($this->roles()->where('name', $role)->first())
        {
            return true;
        }

        return false;
    }

    // A User Has Region
    public function regions()
    {
        return $this->belongsToMany(Region::class)
                    ->withTimestamps()
                    ->withPivot([
                        'userName',
                        'regionCode'
                    ]);
    }

    // to use GATE
    public function hasAnyRegions($regions)
    {
        if($this->regions()->whereIn('name', $regions)->first())
        {
            return true;
        }
        return false;
    }

    // to use GATE
    public function hasRegion($region)
    {
        if($this->regions()->where('name', $region)->first())
        {
            return true;
        }
        return false;
    }

    // A User Has a level
    public function levels()
    {
        return $this->belongsToMany(Level::class)
                    ->withTimestamps()
                    ->withPivot([
                        'userName',
                        'levelName'
                    ]);
    }

    // to use GATE
    public function hasAnyLevels($levels)
    {
        if($this->levels()->whereIn('name', $levels)->first())
        {
            return true;
        }
        return false;
    }

    // to use GATE
    public function hasLevel($level)
    {
        if($this->levels()->where('name', $level)->first())
        {
            return true;
        }
        return false;
    }


    // A User Has many accesses
    public function accesses()
    {
        return $this->belongsToMany(Access::class)
                    ->withTimestamps()
                    ->withPivot([
                        'site_id',
                        'userName',
                        'accessName'
                    ]);
    }

    // to use GATE
    public function hasAnyAccesses($accesses)
    {
        if($this->accesses()->whereIn('name', $accesses)->first())
        {
            return true;
        }
        return false;
    }

    // to use GATE
    public function hasAccess($access)
    {
        if($this->accesses()->where('name', $access)->first())
        {
            return true;
        }

        return false;
    }

    // A User Has many Sites
    public function sites()
    {
        return $this->belongsToMany(Site::class)
                    ->withTimestamps()
                    ->withPivot([
                        'access_id',
                        'userName',
                        'siteCode',
                        'accessName'

                    ]);
    }


    // to use GATE
    public function hasAnySites($sites)
    {
        if($this->sites()->whereIn('name', $sites)->first())
        {
            return true;
        }
        return false;
    }

    // to use GATE
    public function hasSite($site)
    {
        if($this->accesses()->where('name', $site)->first())
        {
            return true;
        }

        return false;
    }

}
