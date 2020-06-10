<?php

namespace App\DataTransferObjects\Product;

use Spatie\DataTransferObject\DataTransferObjectCollection;

class ProductCollection extends DataTransferObjectCollection
{
    public function current(): ProductData
    {
        return parent::current();
    }
}
