<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use App\Services\AppointmentService;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    private $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->middleware(['auth:sanctum']);
        $this->appointmentService = $appointmentService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (auth()->user())
        {
            $appointments = $this->appointmentService->getAll();
//            dd($appointments);
            return response()->json(['appointments' => $appointments]);
        }
    }


    public function create()
    {

    }

    public function store(AppointmentRequest $request)
    {
//        dd($request->all());
        $result = $this->appointmentService->store($request->all());
        if ($result)
        {
            return response()->json([
                'appointment' => $result
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
    public function update(AppointmentRequest $request, $id)
    {
        if ($request->validated() && $id)
        {
            $request->merge(['id' => $id]);
            $appointment = $this->appointmentService->update($request->all());
            if ($appointment)
            {
                return response()->json([
                    'appointment' => $appointment
                ]);
            }
        }
    }


    public function destroy($id)
    {
        if ($id)
        {
            $result = $this->appointmentService->delete($id);
            if ($result)
            {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Appointment Deleted Successfully!',
                ],200);
            }
            else{
                return response()->json([
                    'status' => 'failed',
                    'message' => "Appointment didn't delete!",
                ],502);
            }
        }
    }
}
