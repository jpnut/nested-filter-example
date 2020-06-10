<?php

namespace Tests\Feature;

use App\Factories\CustomerFactory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     * @dataProvider customerProvider
     *
     * @param  array  $customer_data
     */
    public function it_can_create_new_customer(array $customer_data)
    {
        $response = $this->post('/api/customers', $customer_data);

        $response->assertStatus(200);
        $response->assertJson($customer_data);

        $this->assertDatabaseHas('customers', $customer_data);
    }

    /**
     * @test
     * @dataProvider customerProvider
     *
     * @param  array  $customer_data
     */
    public function it_can_fetch_existing_customer(array $customer_data)
    {
        $customer = CustomerFactory::new()->create($customer_data);

        $response = $this->get("/api/customers/{$customer->getKey()}");

        $response->assertStatus(200);
        $response->assertJson($customer_data);
    }

    /**
     * @test
     * @dataProvider customerProvider
     *
     * @param  array  $customer_data
     */
    public function it_can_delete_customer(array $customer_data)
    {
        $customer = CustomerFactory::new()->create($customer_data);

        $response = $this->delete("/api/customers/{$customer->getKey()}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('customers', [
            'id' => $customer->getKey(),
        ]);
    }

    /**
     * @test
     */
    public function it_can_list_customers()
    {
        CustomerFactory::new()->times(15);

        $response = $this->get("/api/customers?per_page=5&page=2");

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
     * @dataProvider customerProvider
     *
     * @param  array  $customer_data
     */
    public function it_can_update_customer(array $customer_data)
    {
        $customer = CustomerFactory::new()->create($customer_data);

        $response = $this->put("/api/customers/{$customer->getKey()}", $new_customer_data = [
            'full_name' => 'Mr. Bar',
            'email'     => 'test@example.net',
            'phone'     => null,
        ]);

        $response->assertStatus(200);
        $response->assertJson($new_customer_data);

        $this->assertDatabaseHas('customers', $new_customer_data);
    }

    public function customerProvider(): array
    {
        return [
            [
                [
                    'full_name' => 'Mr. Foo',
                    'email'     => 'test@example.com',
                    'phone'     => '010',
                ]
            ],
        ];
    }
}
