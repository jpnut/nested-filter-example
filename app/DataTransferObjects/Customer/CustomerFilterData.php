<?php

namespace App\DataTransferObjects\Customer;

use App\Support\Filter\IDFilterObject;
use JPNut\EloquentNestedFilter\AbstractFilter;
use JPNut\EloquentNestedFilter\DateFilterObject;
use JPNut\EloquentNestedFilter\StringFilterObject;

class CustomerFilterData extends AbstractFilter
{
    public ?IDFilterObject $id;

    public ?StringFilterObject $reference;

    public ?StringFilterObject $full_name;

    public ?StringFilterObject $email;

    public ?StringFilterObject $phone;

    public ?DateFilterObject $created_at;

    public ?DateFilterObject $updated_at;

    /**
     * @var \App\DataTransferObjects\Order\OrderFilterData[]|null
     */
    public ?array $orders;
}
