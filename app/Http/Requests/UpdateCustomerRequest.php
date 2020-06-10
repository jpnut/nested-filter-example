<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Customer\UpdateCustomerData;
use Illuminate\Foundation\Http\FormRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class UpdateCustomerRequest extends FormRequest implements CodeGenRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'full_name' => ['sometimes', 'string', 'max:512'],
            'email'     => ['nullable', 'email', 'max:512'],
            'phone'     => ['nullable', 'string', 'max:64'],
        ];
    }

    /**
     * @return \App\DataTransferObjects\Customer\UpdateCustomerData
     *
     * @code-gen-property body
     */
    public function data(): UpdateCustomerData
    {
        return UpdateCustomerData::fromRequest($this);
    }
}
