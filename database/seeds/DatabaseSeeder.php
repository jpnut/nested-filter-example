<?php

use App\Factories\CustomerFactory;
use App\Factories\OrderFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $customer = CustomerFactory::new();
        $order = OrderFactory::new();

        $customer->withOrder($order->withProduct())->times(200);
    }
}
