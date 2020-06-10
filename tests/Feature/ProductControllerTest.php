<?php

namespace Tests\Feature;

use App\Factories\ProductFactory;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @test
     * @dataProvider productProvider
     *
     * @param  array  $product_data
     */
    public function it_can_create_new_product(array $product_data)
    {
        $response = $this->post('/api/products', $product_data);

        $response->assertStatus(200);
        $response->assertJson(json_decode(json_encode($product_data), true));

        $this->assertDatabaseHas('products', $product_data);
    }

    /**
     * @test
     * @dataProvider productProvider
     *
     * @param  array  $product_data
     */
    public function it_can_fetch_existing_product(array $product_data)
    {
        $product = ProductFactory::new()->create($product_data);

        $response = $this->get("/api/products/{$product->getKey()}");

        $response->assertStatus(200);
        $response->assertJson(json_decode(json_encode($product_data), true));
    }

    /**
     * @test
     * @dataProvider productProvider
     *
     * @param  array  $product_data
     */
    public function it_can_delete_product(array $product_data)
    {
        $product = ProductFactory::new()->create($product_data);

        $response = $this->delete("/api/products/{$product->getKey()}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('products', [
            'id' => $product->getKey(),
        ]);
    }

    /**
     * @test
     */
    public function it_can_list_products()
    {
        ProductFactory::new()->times(15);

        $response = $this->get("/api/products?per_page=5&page=2");

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
     * @dataProvider productProvider
     *
     * @param  array  $product_data
     */
    public function it_can_update_product(array $product_data)
    {
        $product = ProductFactory::new()->create($product_data);

        $response = $this->put("/api/products/{$product->getKey()}", $new_product_data = [
            'name'         => 'Bar',
            'description'  => 'A different example description',
            'published_at' => Carbon::parse('2020-06-02'),
            'archived_at'  => Carbon::parse('2020-06-05'),
            'available'    => false,
        ]);

        $response->assertStatus(200);
        $response->assertJson(json_decode(json_encode($new_product_data), true));

        $this->assertDatabaseHas('products', $new_product_data);
    }

    public function productProvider(): array
    {
        return [
            [
                [
                    'name'         => 'Foo',
                    'description'  => 'an example description',
                    'amount'       => 100,
                    'published_at' => Carbon::parse('2020-06-01'),
                    'archived_at'  => null,
                    'available'    => true,
                ]
            ],
        ];
    }
}
