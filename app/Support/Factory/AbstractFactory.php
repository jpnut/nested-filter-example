<?php

/**
 * See https://stitcher.io/blog/laravel-beyond-crud-09-test-factories
 */

namespace App\Support\Factory;

use Illuminate\Support\Collection;

abstract class AbstractFactory
{
    // Concrete factory classes should add a return type
    abstract public function create(array $extra = []);

    public function times(int $times, array $extra = []): Collection
    {
        return collect()
            ->times($times)
            ->map(fn() => $this->create($extra));
    }
}
