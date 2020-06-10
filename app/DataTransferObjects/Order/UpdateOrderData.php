<?php

namespace App\DataTransferObjects\Order;

use App\Http\Requests\UpdateOrderRequest;
use App\Order;
use App\Support\DataTransferObject\HasDates;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Spatie\DataTransferObject\DataTransferObject;

class UpdateOrderData extends DataTransferObject
{
    use HasDates;

    public ?Carbon $placed_at;

    public ?Carbon $completed_at;

    public ?Carbon $cancelled_at;

    public static function fromRequest(UpdateOrderRequest $request): self
    {
        return new self([
            'placed_at'    => static::parseCarbon($request->input('placed_at')),
            'completed_at' => static::parseCarbon($request->input('completed_at')),
            'cancelled_at' => static::parseCarbon($request->input('cancelled_at')),
        ]);
    }

    public function updateModel(Order $order, array $validated): Order
    {
        $order->fill(
            Arr::only(
                [
                    'placed_at'    => $this->placed_at,
                    'completed_at' => $this->completed_at,
                    'cancelled_at' => $this->cancelled_at,
                ],
                $validated
            )
        );

        $order->save();

        return $order;
    }
}
