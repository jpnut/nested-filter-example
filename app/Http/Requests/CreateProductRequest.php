<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Product\CreateProductData;
use Illuminate\Foundation\Http\FormRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class CreateProductRequest extends FormRequest implements CodeGenRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'         => ['required', 'string', 'max:512'],
            'description'  => ['nullable', 'string', 'max:10000'],
            'amount'       => ['required', 'integer', 'min:0', 'max:999999999999'],
            'published_at' => ['nullable', 'date'],
            'archived_at'  => ['nullable', 'date'],
            'available'    => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return \App\DataTransferObjects\Product\CreateProductData
     *
     * @code-gen-property body
     */
    public function data(): CreateProductData
    {
        return CreateProductData::fromRequest($this);
    }
}
