<?php

namespace App\DataTransferObjects\Customer;

use App\Support\DataTransferObject\PaginationRequestParams;

class IndexCustomerRequestParams extends PaginationRequestParams
{
    public ?CustomerFilterData $filter;

    /** @var string[]|null */
    public ?array $include;

    public ?string $search;
}
