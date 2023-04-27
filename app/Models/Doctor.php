<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name', 'telephone','date_hired','speciality'];
    protected $table = 'doctors';

    public function appointments(){
        return $this->hasMany(Appointment::class, 'doctor_code','code');
    }
    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
        'date_hired' => 'date:Y-m-d',
    ];

    protected $appends = [
        'numRDVs'
    ];
    public function getNumRDVsAttribute(){
        return $this->appointments()->count();
    }
}
