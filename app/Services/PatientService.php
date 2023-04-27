<?php

namespace App\Services;

use App\Models\Patient;
use Exception;
use Illuminate\Support\Facades\DB;
use PhpParser\Comment\Doc;

class PatientService
{

    public function __construct()
    {

    }

    public function getAll()
    {
        return Patient::all();
//        dd(Patient::all());
    }
    public function getNoAppointments()
    {

        return Patient::doesntHave('appointment')->get();
    }
    public function getFirst()
    {
        return Patient::first();
    }
    public function getLast()
    {
        return Patient::last();
    }
    public function getById($id)
    {
        return Patient::findOrFail($id);
    }
    public function getByCode($code)
    {
        return Patient::where('code',$code)->get();
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data =  Patient::create($data);
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
            $result = Patient::find($data['id'])->update($data);
            DB::commit();
            if ($result){
                $patient = $this->getById($data['id']);
                return $patient;
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
                $patient = $this->getById($id);
                $patient->delete();
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
