<?php

namespace App\Providers;

use App\Support\Request\FetchRequest;
use Illuminate\Support\ServiceProvider;

class FetchRequestServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->resolving(FetchRequest::class, function ($request, $app) {
            $request = FetchRequest::createFrom($app['request'], $request);

            $request->setContainer($app);
        });
    }
}
