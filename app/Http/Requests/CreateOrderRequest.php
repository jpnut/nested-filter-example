<?php

namespace App\Http\Requests;

use App\Customer;
use App\DataTransferObjects\Order\CreateOrderData;
use App\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class CreateOrderRequest extends FormRequest implements CodeGenRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'placed_at'    => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date', 'exclude_if:placed_at,null'],
            'cancelled_at' => ['nullable', 'date', 'exclude_if:placed_at,null', 'exclude_unless:completed_at,null'],
            'customer'     => ['required', Rule::exists(Customer::class, 'id')],
        ];
    }

    /**
     * @return \App\DataTransferObjects\Order\CreateOrderData
     *
     * @code-gen-property body
     */
    public function data(): CreateOrderData
    {
        return CreateOrderData::fromRequest($this);
    }
}
