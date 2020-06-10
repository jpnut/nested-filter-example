<?php

namespace App\DataTransferObjects\Customer;

use App\Customer;
use App\DataTransferObjects\Order\OrderCollection;
use App\DataTransferObjects\Order\OrderData;
use App\Order;
use App\Support\DataTransferObject\ResponsableDataTransferObject;
use Carbon\Carbon;

class CustomerData extends ResponsableDataTransferObject
{
    public int $id;

    public string $reference;

    public string $full_name;

    public ?string $email;

    public ?string $phone;

    public Carbon $created_at;

    public Carbon $updated_at;

    public ?OrderCollection $orders;

    public static function fromModel(Customer $customer): self
    {
        return new self([
            'id'         => $customer->getKey(),
            'reference'  => $customer->reference,
            'full_name'  => $customer->full_name,
            'email'      => $customer->email,
            'phone'      => $customer->phone,
            'created_at' => $customer->created_at,
            'updated_at' => $customer->updated_at,
            'orders'     => $customer->relationLoaded('orders') && !is_null($customer->orders) ?
                new OrderCollection(
                    $customer->orders->map(fn(Order $order) => OrderData::fromModel($order))->all()
                )
                : null,
        ]);
    }
}
