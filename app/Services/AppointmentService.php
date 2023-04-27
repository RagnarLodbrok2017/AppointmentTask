<?php

namespace App\Services;

use App\Models\Appointment;
use Exception;
use Illuminate\Support\Facades\DB;
use PhpParser\Comment\Doc;

class AppointmentService
{

    public function __construct()
    {

    }

    public function getAll()
    {
        return Appointment::all();
    }
    public function getFirst()
    {
        return Appointment::first();
    }
    public function getLast()
    {
        return Appointment::last();
    }
    public function getById($id)
    {
        return Appointment::findOrFail($id);
    }
    public function getByCode($code)
    {
        return Appointment::where('code',$code)->get();
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data =  Appointment::create($data);
            DB::commit();
            return $data;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function update($data)
    {
        DB::beginTransaction();
        try {
            $result = Appointment::find($data['id'])->update($data);
            DB::commit();
            if ($result){
                $appointment = $this->getById($data['id']);
                return $appointment;
            }
            return $result;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function delete($id)
    {
        if ($id){
            DB::beginTransaction();
            try {
                $appointment = $this->getById($id);
                $appointment->delete();
                DB::commit();
                return true;
            }
            catch (Exception $ex){
                DB::rollBack();
                var_dump($ex->getMessage());
                return false;
            }
        }
    }

}
