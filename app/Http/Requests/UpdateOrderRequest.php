<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Order\UpdateOrderData;
use App\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class UpdateOrderRequest extends FormRequest implements CodeGenRequest
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
        ];
    }

    /**
     * @return \App\DataTransferObjects\Order\UpdateOrderData
     *
     * @code-gen-property body
     */
    public function data(): UpdateOrderData
    {
        return UpdateOrderData::fromRequest($this);
    }
}
