<?php

namespace App\DataTransferObjects\Order\AddProductToOrderData;

use App\Http\Requests\AddProductToOrderRequest;
use Spatie\DataTransferObject\DataTransferObject;

class AddProductToOrderData extends DataTransferObject
{
    public int $product;

    public static function fromRequest(AddProductToOrderRequest $request): self
    {
        return new self([
            'product' => intval($request->input('product')),
        ]);
    }
}
