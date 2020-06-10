<?php

namespace App\Factories;

use App\Customer;
use App\Support\Factory\AbstractFactory;
use Faker\Factory;
use Faker\Generator;

class CustomerFactory extends AbstractFactory
{
    public ?OrderFactory $orderFactory = null;

    private Generator $faker;

    public function __construct(Generator $faker)
    {
        $this->faker = $faker;
    }

    public static function new(): self
    {
        return new self(Factory::create());
    }

    public function create(array $extra = []): Customer
    {
        $customer = Customer::create(
            array_merge(
                [
                    'full_name' => $this->faker->name,
                    'email'     => $this->faker->email,
                    'phone'     => $this->faker->phoneNumber,
                ],
                $extra
            )
        );

        if ($this->orderFactory) {
            $this->orderFactory->forCustomer($customer)->create();
        }

        return $customer;
    }

    public function withOrder(OrderFactory $orderFactory = null): self
    {
        $clone = clone $this;

        $clone->orderFactory = $orderFactory ?? OrderFactory::new();

        return $clone;
    }
}
