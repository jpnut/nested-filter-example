<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Product\UpdateProductData;
use Illuminate\Foundation\Http\FormRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class UpdateProductRequest extends FormRequest implements CodeGenRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'         => ['sometimes', 'required', 'string', 'max:512'],
            'description'  => ['nullable', 'string', 'max:10000'],
            'published_at' => ['nullable', 'date'],
            'archived_at'  => ['nullable', 'date'],
            'available'    => ['sometimes', 'required', 'boolean'],
        ];
    }

    /**
     * @return \App\DataTransferObjects\Product\UpdateProductData
     *
     * @code-gen-property body
     */
    public function data(): UpdateProductData
    {
        return UpdateProductData::fromRequest($this);
    }
}
