<?php

namespace App\DataTransferObjects\Order;

use Spatie\DataTransferObject\DataTransferObjectCollection;

class OrderCollection extends DataTransferObjectCollection
{
    public function current(): OrderData
    {
        return parent::current();
    }
}
