<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Customer\CreateCustomerData;
use Illuminate\Foundation\Http\FormRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class CreateCustomerRequest extends FormRequest implements CodeGenRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'full_name' => ['required', 'string', 'max:512'],
            'email'     => ['nullable', 'email', 'max:512'],
            'phone'     => ['nullable', 'string', 'max:64'],
        ];
    }

    /**
     * @return \App\DataTransferObjects\Customer\CreateCustomerData
     *
     * @code-gen-property body
     */
    public function data(): CreateCustomerData
    {
        return CreateCustomerData::fromRequest($this);
    }
}
