<?php

namespace App\DataTransferObjects\Order;

use App\Http\Requests\CreateOrderRequest;
use App\Order;
use App\Support\DataTransferObject\HasDates;
use Carbon\Carbon;
use Spatie\DataTransferObject\DataTransferObject;

class CreateOrderData extends DataTransferObject
{
    use HasDates;

    public ?Carbon $placed_at;

    public ?Carbon $completed_at;

    public ?Carbon $cancelled_at;

    public int $customer;

    public static function fromRequest(CreateOrderRequest $request): self
    {
        return new self([
            'placed_at'    => static::parseCarbon($request->input('placed_at')),
            'completed_at' => static::parseCarbon($request->input('completed_at')),
            'cancelled_at' => static::parseCarbon($request->input('cancelled_at')),
            'customer'     => intval($request->input('customer')),
        ]);
    }

    public function createModel(): Order
    {
        $order = new Order([
            'placed_at'    => $this->placed_at,
            'completed_at' => $this->completed_at,
            'cancelled_at' => $this->cancelled_at,
        ]);

        $order->customer()->associate($this->customer);

        $order->save();

        return $order;
    }
}
