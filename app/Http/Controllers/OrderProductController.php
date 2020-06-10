<?php

namespace App\Http\Controllers;

use App\DataTransferObjects\Order\OrderData;
use App\Http\Requests\AddProductToOrderRequest;
use App\Order;
use App\Product;

class OrderProductController extends Controller
{
    /**
     * @param  \App\Http\Requests\AddProductToOrderRequest  $request
     * @param  \App\Order  $order
     * @return \App\DataTransferObjects\Order\OrderData
     *
     * @code-gen
     */
    public function store(AddProductToOrderRequest $request, Order $order): OrderData
    {
        $data = $request->data();

        $order->products()->syncWithoutDetaching([$data->product]);

        $order->total = $order->products->sum('amount');

        $order->save();

        return OrderData::fromModel($order->load('products'));
    }

    /**
     * @param  \App\Order  $order
     * @param  \App\Product  $product
     * @return \App\DataTransferObjects\Order\OrderData
     *
     * @code-gen
     */
    public function destroy(Order $order, Product $product): OrderData
    {
        $order->products()->detach($product);

        $order->total = $order->products->sum('amount');

        $order->save();

        return OrderData::fromModel($order->load('products'));
    }
}
