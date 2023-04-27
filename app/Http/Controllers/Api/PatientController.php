<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Services\PatientService;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    private $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->middleware(['auth:sanctum']);
        $this->patientService = $patientService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (auth()->user())
        {
            $patients = $this->patientService->getAll();
//            dd($patients);
            return response()->json(['patients' => $patients]);
        }
    }

    public function patients_no_appointments()
    {
        if (auth()->user())
        {
            $patients = $this->patientService->getNoAppointments();
//            dd($patients);
            return response()->json(['patients' => $patients]);
        }
    }
    public function create()
    {

    }

    public function store(PatientRequest $request)
    {
        $result = $this->patientService->store($request->all());
        if ($result)
        {
            return response()->json([
                'patient' => $result
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
    public function update(PatientRequest $request, $id)
    {
        if ($request->validated() && $id)
        {
            $request->merge(['id' => $id]);
            $patient = $this->patientService->update($request->all());
            if ($patient)
            {
                return response()->json([
                    'patient' => $patient
                ]);
            }
        }
    }


    public function destroy($id)
    {
        if ($id)
        {
            $result = $this->patientService->delete($id);
            if ($result)
            {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Patient Deleted Successfully!',
                ],200);
            }
            else{
                return response()->json([
                    'status' => 'failed',
                    'message' => "Patient didn't delete!",
                ],502);
            }
        }
    }
}
