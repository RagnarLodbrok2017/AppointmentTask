<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = ['code','name', 'address','date_of_birth','sex'];
    protected $table = 'patients';

    public function appointment(){
        return $this->hasOne(Appointment::class, 'patient_code', 'code');
    }
    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
        'date_hired' => 'date:Y-m-d',
    ];

}
