<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => [
                'max:191',
                Rule::unique('patients', 'code')->ignore($this->id),
                'required'
            ],
            'name' => [
                'max:191',
                'required'
            ],
            'address' => [
                'nullable'
            ],
            'date_of_birth' => [
                'nullable'
            ],
            'sex' => [
                'nullable'
            ],
        ];
    }
}
