<?php

namespace App\DataTransferObjects\Customer;

use Spatie\DataTransferObject\DataTransferObjectCollection;

class CustomerCollection extends DataTransferObjectCollection
{
    public function current(): CustomerData
    {
        return parent::current();
    }
}
