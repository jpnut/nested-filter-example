<?php

namespace App\DataTransferObjects\Product;

use App\DataTransferObjects\Order\OrderCollection;
use App\DataTransferObjects\Order\OrderData;
use App\Order;
use App\Product;
use App\Support\DataTransferObject\ResponsableDataTransferObject;
use Carbon\Carbon;

class ProductData extends ResponsableDataTransferObject
{
    public int $id;

    public string $reference;

    public string $name;

    public string $slug;

    public ?string $description;

    public int $amount;

    public ?Carbon $published_at;

    public ?Carbon $archived_at;

    public bool $available;

    public ?Carbon $created_at;

    public ?Carbon $updated_at;

    public ?OrderCollection $orders;

    public static function fromModel(Product $product): self
    {
        return new self([
            'id'           => $product->getKey(),
            'reference'    => $product->reference,
            'name'         => $product->name,
            'slug'         => $product->slug,
            'description'  => $product->description,
            'amount'       => $product->amount,
            'published_at' => $product->published_at,
            'archived_at'  => $product->archived_at,
            'available'    => $product->available,
            'created_at'   => $product->created_at,
            'updated_at'   => $product->updated_at,
            'orders'       => $product->relationLoaded('orders') && !is_null($product->orders) ?
                new OrderCollection(
                    $product->orders->map(fn(Order $order) => OrderData::fromModel($order))->all()
                )
                : null,
        ]);
    }
}
