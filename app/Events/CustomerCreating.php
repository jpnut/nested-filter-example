<?php

namespace App\Events;

use App\Customer;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CustomerCreating
{
    use Dispatchable, SerializesModels;

    public Customer $customer;

    /**
     * Create a new event instance.
     *
     * @param  \App\Customer  $customer
     */
    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }
}
