<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * @var boolean
     */
    protected static $setUpHasRunOnce = false;

    /**
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        if (!static::$setUpHasRunOnce) {
//            $this->artisan('migrate:fresh');
//            $this->seed();
            static::$setUpHasRunOnce = true;
        }
    }
}
