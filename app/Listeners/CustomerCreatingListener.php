<?php

namespace App\Listeners;

use App\Events\CustomerCreating;
use Illuminate\Support\Str;

class CustomerCreatingListener
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
     * @param  \App\Events\CustomerCreating  $event
     * @return void
     */
    public function handle(CustomerCreating $event)
    {
        $customer = $event->customer;

        $customer->reference = Str::random(8);
    }
}
