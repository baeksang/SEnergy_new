<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class)
                    ->withTimestamps()
                    ->withPivot([
                        'userName',
                        'regionCode'
                    ]);
    }
}
