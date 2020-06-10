<?php

namespace Tests\Feature;

use App\Customer;
use App\Factories\CustomerFactory;
use App\Factories\OrderFactory;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class OrderControllerTest extends TestCase
{
    use DatabaseMigrations;

    private Customer $customer;

    public function setUp(): void
    {
        parent::setUp();

        $this->customer = CustomerFactory::new()->create();
    }

    /**
     * @test
     * @dataProvider orderProvider
     *
     * @param  array  $order_data
     */
    public function it_can_create_new_order(array $order_data)
    {
        $customer = CustomerFactory::new()->create()->getKey();

        $full_order_data = array_merge($order_data, compact('customer'));

        $response = $this->post('/api/orders', $full_order_data);

        $response->assertStatus(200);
        $response->assertJson(
            [
                'placed_at'    => optional($order_data['placed_at'])->toISOString(),
                'completed_at' => optional($order_data['completed_at'])->toISOString(),
                'cancelled_at' => optional($order_data['cancelled_at'])->toISOString(),
            ]
        );

        $this->assertDatabaseHas('orders', $order_data);
    }

    /**
     * @test
     * @dataProvider orderProvider
     *
     * @param  array  $order_data
     */
    public function it_can_fetch_existing_order(array $order_data)
    {
        $order = OrderFactory::new()->forCustomer($this->customer)->create($order_data);

        $response = $this->get("/api/orders/{$order->getKey()}");

        $response->assertStatus(200);
        $response->assertJson(json_decode(json_encode($order_data), true));
    }

    /**
     * @test
     * @dataProvider orderProvider
     *
     * @param  array  $order_data
     */
    public function it_can_delete_order(array $order_data)
    {
        $order = OrderFactory::new()->forCustomer($this->customer)->create($order_data);

        $response = $this->delete("/api/orders/{$order->getKey()}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('orders', [
            'id' => $order->getKey(),
        ]);
    }

    /**
     * @test
     */
    public function it_can_list_orders()
    {
        OrderFactory::new()->forCustomer($this->customer)->times(15);

        $response = $this->get("/api/orders?per_page=5&page=2");

        $response->assertStatus(200);
        $response->assertJson([
            'meta' => [
                'current_page' => 2,
                'from'         => 6,
                'last_page'    => 3,
                'per_page'     => 5,
                'to'           => 10,
                'total'        => 15,
            ]
        ]);
    }

    /**
     * @test
     * @dataProvider orderProvider
     *
     * @param  array  $order_data
     */
    public function it_can_update_order(array $order_data)
    {
        $order = OrderFactory::new()->forCustomer($this->customer)->create($order_data);

        $response = $this->put("/api/orders/{$order->getKey()}", $new_order_data = [
            'placed_at'    => Carbon::parse('2020-06-02'),
            'completed_at' => null,
            'cancelled_at' => null,
        ]);

        $response->assertStatus(200);
        $response->assertJson(json_decode(json_encode($new_order_data), true));

        $this->assertDatabaseHas('orders', $new_order_data);
    }

    public function orderProvider(): array
    {
        return [
            [
                [
                    'placed_at'    => Carbon::parse('2020-06-01'),
                    'completed_at' => Carbon::parse('2020-06-05'),
                    'cancelled_at' => null,
                ]
            ],
        ];
    }
}
