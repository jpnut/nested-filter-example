<?php

namespace App\Factories;

use App\Order;
use App\Product;
use App\Support\Factory\AbstractFactory;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Support\Str;

class ProductFactory extends AbstractFactory
{
    private Generator $faker;

    private ?Order $order = null;

    public function __construct(Generator $faker)
    {
        $this->faker = $faker;
    }

    public static function new(): self
    {
        return new self(Factory::create());
    }

    public function create(array $extra = []): Product
    {
        $product = new Product(
            array_merge(
                [
                    'name'         => $this->faker->words(3, true),
                    'description'  => join($this->faker->paragraphs()),
                    'amount'       => $this->faker->numberBetween(5, 5000) * 100,
                    'published_at' => $published = ($this->order
                        ? $this->faker->dateTimeBetween($this->order->placed_at ?? '-1 year', 'now')
                        : $this->faker->optional(0.75)->dateTimeBetween('-1 year', 'now')),
                    'archived_at'  => $this->order
                        ? ($this->order->isCancelled() && $published
                            ? $this->faker->optional(0.25)->dateTimeBetween($published, 'now')
                            : null
                        )
                        : ($published
                            ? $this->faker->optional(0.1)->dateTimeBetween($published, 'now')
                            : null
                        ),
                    'available'    => $this->faker->boolean(60),
                ],
                $extra
            )
        );

        $product->save();

        if ($this->order) {
            $this->order->products()->attach($product->getKey());
        }

        return $product;
    }

    public function forOrder(Order $order): self
    {
        $this->order = $order;

        return $this;
    }
}
