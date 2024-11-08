<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = [
        'departament_id',
        'name',
        'work_modality',
        'level',
        'order',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'position_user');
    }
}
