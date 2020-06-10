<?php

namespace App\Factories;

use App\Customer;
use App\Order;
use App\Support\Factory\AbstractFactory;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Support\Str;

class OrderFactory extends AbstractFactory
{
    private Generator $faker;

    private ?Customer $customer = null;

    private ?ProductFactory $productFactory = null;

    public function __construct(Generator $faker)
    {
        $this->faker = $faker;
    }

    public static function new(): self
    {
        return new self(Factory::create());
    }

    public function create(array $extra = []): Order
    {
        $placed = $this->faker->boolean(75);
        $completed = $placed && $this->faker->boolean(75);
        $cancelled = $placed && !$completed && $this->faker->boolean(20);

        $order = new Order(
            array_merge(
                [
                    'placed_at'    => $placed_at = ($placed ? $this->faker->dateTimeBetween('-5 years', 'now') : null),
                    'completed_at' => $completed ? $this->faker->dateTimeBetween($placed_at, 'now') : null,
                    'cancelled_at' => $cancelled ? $this->faker->dateTimeBetween($placed_at, 'now') : null,
                ],
                $extra
            )
        );

        if ($this->customer) {
            $order->customer()->associate($this->customer);
        }

        $order->save();

        if ($this->productFactory) {
            $this->productFactory->forOrder($order)->create();
        }

        $order->total = $order->products->sum('amount');

        $order->save();

        return $order;
    }

    public function forCustomer(Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function withProduct(ProductFactory $productFactory = null): self
    {
        $clone = clone $this;

        $clone->productFactory = $productFactory ?? ProductFactory::new();

        return $clone;
    }
}
