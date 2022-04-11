<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Access extends Model
{
    use HasFactory;

    public function users(){
    return $this->belongsToMany(User::class)
                ->withTimestamps()
                ->withPivot([
                    'site_id',
                    'userName',
                    'accessName'
                ]);
    }
}
