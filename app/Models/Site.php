<?php

namespace App\Models;

use App\Models\Access;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_code',
        'site_id',
        'site_name',
        'site_address',
        'region_code',
        'region_name',
        'completeyear',
        'completemonth',
        'completeday',
        'capacity',
        'initialDate',
        'no_mastercontroller',
        'no_inverter',
        'operation_type',
        'lat',
        'lng'
    ];

    // public function mastercontrollers()
    // {
    //     return $this->belongsToMany('App\Mastercontroller');
    // }

    // public function inverters()
    // {
    //     return $this->belongsToMany('App\Inverter');
    // }

    // public function switchgears()
    // {
    //     return $this->belongsToMany('App\switchgear');
    // }

    public function users()
    {
        return $this->belongsToMany(User::class)
                    ->withTimestamps()
                    ->withPivot([
                        'userName',
                        'siteCode'
                    ]);
    }

    public function accesses(){
        return $this->belongsToMany(Access::class)
                    ->withTimestamps()
                    ->withPivot([
                        'accessName',
                        'siteName',
                    ]);
    }
}
