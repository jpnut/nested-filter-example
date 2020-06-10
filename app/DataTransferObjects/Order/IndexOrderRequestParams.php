<?php

namespace App\DataTransferObjects\Order;

use App\Support\DataTransferObject\PaginationRequestParams;

class IndexOrderRequestParams extends PaginationRequestParams
{
    public ?OrderFilterData $filter;

    /** @var string[]|null */
    public ?array $include;
}
