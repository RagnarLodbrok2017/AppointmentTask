<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $fillable = ['number','date','time', 'patient_code','doctor_code'];
    protected $table = 'appointments';

    public function doctor(){
        return $this->belongsTo(Doctor::class, 'doctor_code', 'code');
    }
    public function patient(){
        return $this->belongsTo(Patient::class, 'patient_code', 'code');
    }
    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
        'date' => 'date:Y-m-d',
//        'time' => 'date:H',
    ];

}
