<?php

namespace App\DataTransferObjects\Order;

use App\Support\Filter\IDFilterObject;
use JPNut\EloquentNestedFilter\AbstractFilter;
use JPNut\EloquentNestedFilter\DateFilterObject;
use JPNut\EloquentNestedFilter\NumberFilterObject;
use JPNut\EloquentNestedFilter\StringFilterObject;

class OrderFilterData extends AbstractFilter
{
    public ?IDFilterObject $id;

    public ?StringFilterObject $reference;

    public ?NumberFilterObject $total;

    public ?DateFilterObject $placed_at;

    public ?DateFilterObject $completed_at;

    public ?DateFilterObject $cancelled_at;

    public ?DateFilterObject $created_at;

    public ?DateFilterObject $updated_at;

    /** @var \App\DataTransferObjects\Customer\CustomerFilterData[]|null */
    public ?array $customer;

    /** @var \App\DataTransferObjects\Product\ProductFilterData[]|null */
    public ?array $products;
}
