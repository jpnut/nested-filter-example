<?php

namespace App\Events;

use App\Order;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreating
{
    use Dispatchable, SerializesModels;

    public Order $order;

    /**
     * Create a new event instance.
     *
     * @param  \App\Order  $order
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
}
