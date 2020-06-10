<?php

namespace App\DataTransferObjects\Order;

use App\DataTransferObjects\Customer\CustomerData;
use App\DataTransferObjects\Product\ProductCollection;
use App\DataTransferObjects\Product\ProductData;
use App\Order;
use App\Product;
use App\Support\DataTransferObject\ResponsableDataTransferObject;
use Carbon\Carbon;

class OrderData extends ResponsableDataTransferObject
{
    public int $id;

    public string $reference;

    public int $total;

    public ?Carbon $placed_at;

    public ?Carbon $completed_at;

    public ?Carbon $cancelled_at;

    public ?Carbon $created_at;

    public ?Carbon $updated_at;

    public ?CustomerData $customer;

    public ?ProductCollection $products;

    public static function fromModel(Order $order): self
    {
        return new self([
            'id'           => $order->getKey(),
            'reference'    => $order->reference,
            'total'        => $order->total ?? 0,
            'placed_at'    => $order->placed_at,
            'completed_at' => $order->completed_at,
            'cancelled_at' => $order->cancelled_at,
            'created_at'   => $order->created_at,
            'updated_at'   => $order->updated_at,
            'customer'     => $order->relationLoaded('customer') && !is_null($order->customer)
                ? CustomerData::fromModel($order->customer)
                : null,
            'products'     => $order->relationLoaded('products') && !is_null($order->products) ?
                new ProductCollection(
                    $order->products->map(fn(Product $product) => ProductData::fromModel($product))->all(),
                )
                : null,
        ]);
    }
}
