<?php

namespace App\Events;

use App\Product;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductCreating
{
    use Dispatchable, SerializesModels;

    public Product $product;

    /**
     * Create a new event instance.
     *
     * @param  \App\Product  $product
     */
    public function __construct(Product $product)
    {
        $this->product = $product;
    }
}
