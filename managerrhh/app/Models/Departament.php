<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departament extends Model
{
    protected $fillable = ['parent', 'name', 'has_childs'];

    public function parentDepartment()
    {
        return $this->belongsTo(Departament::class, 'parent');
    }
    public function childDepartments()
    {
        return $this->hasMany(Departament::class, 'parent');
    }
}
