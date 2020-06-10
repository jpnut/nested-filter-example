<?php

namespace App\Listeners;

use App\Events\ProductCreating;
use Illuminate\Support\Str;

class ProductCreatingListener
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
     * @param  \App\Events\ProductCreating  $event
     * @return void
     */
    public function handle(ProductCreating $event)
    {
        $product = $event->product;

        $product->reference = Str::random(8);
    }
}
