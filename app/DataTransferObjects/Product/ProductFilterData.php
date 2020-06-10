<?php

namespace App\DataTransferObjects\Product;

use App\Support\Filter\IDFilterObject;
use JPNut\EloquentNestedFilter\AbstractFilter;
use JPNut\EloquentNestedFilter\BooleanFilterObject;
use JPNut\EloquentNestedFilter\DateFilterObject;
use JPNut\EloquentNestedFilter\NumberFilterObject;
use JPNut\EloquentNestedFilter\StringFilterObject;

class ProductFilterData extends AbstractFilter
{
    public ?IDFilterObject $id;

    public ?StringFilterObject $reference;

    public ?StringFilterObject $name;

    public ?StringFilterObject $slug;

    public ?StringFilterObject $description;

    public ?NumberFilterObject $amount;

    public ?DateFilterObject $published_at;

    public ?DateFilterObject $archived_at;

    public ?BooleanFilterObject $available;

    public ?DateFilterObject $created_at;

    public ?DateFilterObject $updated_at;

    /** @var \App\DataTransferObjects\Order\OrderFilterData[]|null */
    public ?array $orders;
}
