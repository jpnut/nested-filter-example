<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Order\AddProductToOrderData\AddProductToOrderData;
use App\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class AddProductToOrderRequest extends FormRequest implements CodeGenRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'product' => [
                'required',
                Rule::exists(Product::class, 'id'),
            ],
        ];
    }

    /**
     * @return \App\DataTransferObjects\Order\AddProductToOrderData\AddProductToOrderData
     *
     * @code-gen-property body
     */
    public function data(): AddProductToOrderData
    {
        return AddProductToOrderData::fromRequest($this);
    }
}
