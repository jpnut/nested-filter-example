<?php

namespace App\DataTransferObjects\Product;

use App\Support\DataTransferObject\PaginationRequestParams;

class IndexProductRequestParams extends PaginationRequestParams
{
    public ?ProductFilterData $filter;

    /** @var string[]|null */
    public ?array $include;

    public ?string $search;
}
