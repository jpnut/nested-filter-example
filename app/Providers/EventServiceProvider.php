<?php

namespace App\Providers;

use App\Events\CustomerCreating;
use App\Events\OrderCreating;
use App\Events\ProductCreating;
use App\Listeners\CustomerCreatingListener;
use App\Listeners\OrderCreatingListener;
use App\Listeners\ProductCreatingListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class       => [
            SendEmailVerificationNotification::class,
        ],
        CustomerCreating::class => [
            CustomerCreatingListener::class,
        ],
        OrderCreating::class    => [
            OrderCreatingListener::class,
        ],
        ProductCreating::class  => [
            ProductCreatingListener::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
