<?php

namespace App\Listeners;

use App\Events\OrderCreating;
use Illuminate\Support\Str;

class OrderCreatingListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderCreating  $event
     * @return void
     */
    public function handle(OrderCreating $event)
    {
        $order = $event->order;

        $order->reference = Str::random(8);
    }
}
