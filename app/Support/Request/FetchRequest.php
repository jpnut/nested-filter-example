<?php

namespace App\Support\Request;

use Illuminate\Contracts\Container\Container;
use Illuminate\Http\Request;

class FetchRequest extends Request
{
    /**
     * The container instance.
     *
     * @var \Illuminate\Contracts\Container\Container
     */
    protected $container;

    /**
     * Set the container implementation.
     *
     * @param  \Illuminate\Contracts\Container\Container  $container
     * @return \App\Support\Request\FetchRequest
     */
    public function setContainer(Container $container): self
    {
        $this->container = $container;

        return $this;
    }
}
