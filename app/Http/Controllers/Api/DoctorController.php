<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DoctorRequest;
use App\Services\DoctorService;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    private $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->middleware(['auth:sanctum']);
        $this->doctorService = $doctorService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (auth()->user())
        {
            $doctors = $this->doctorService->getAll();
//            dd($doctors);
            return response()->json(['doctors' => $doctors]);
        }
    }


    public function create()
    {

    }

    public function store(DoctorRequest $request)
    {
        $result = $this->doctorService->store($request->all());
        if ($result)
        {
            return response()->json([
                'doctor' => $result
            ]);
        }
    }

    public function show($id)
    {

    }

    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     */
    public function update(DoctorRequest $request, $id)
    {
        if ($request->validated() && $id)
        {
            $request->merge(['id' => $id]);
            $doctor = $this->doctorService->update($request->all());
            if ($doctor)
            {
                return response()->json([
                    'doctor' => $doctor
                ]);
            }
        }
    }


    public function destroy($id)
    {
        if ($id)
        {
            $result = $this->doctorService->delete($id);
            if ($result)
            {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Doctor Deleted Successfully!',
                ],200);
            }
            else{
                return response()->json([
                    'status' => 'failed',
                    'message' => "Doctor didn't delete!",
                ],502);
            }
        }
    }
}
