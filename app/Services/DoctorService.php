<?php

namespace App\Services;

use App\Models\Doctor;
use Exception;
use Illuminate\Support\Facades\DB;
use PhpParser\Comment\Doc;

class DoctorService
{

    public function __construct()
    {

    }

    public function getAll()
    {
        return Doctor::all();
//        dd(Doctor::all());
    }
    public function getFirst()
    {
        return Doctor::first();
    }
    public function getLast()
    {
        return Doctor::last();
    }
    public function getById($id)
    {
        return Doctor::findOrFail($id);
    }
    public function getByCode($code)
    {
        return Doctor::where('code',$code)->get();
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data =  Doctor::create($data);
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
            $result = Doctor::find($data['id'])->update($data);
            DB::commit();
            if ($result){
                $doctor = $this->getById($data['id']);
                return $doctor;
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
                $doctor = $this->getById($id);
                $doctor->delete();
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
