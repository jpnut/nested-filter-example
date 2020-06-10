<?php

namespace App\Support\DataTransferObject;

use Spatie\DataTransferObject\DataTransferObject;

class PaginationRequestParams extends DataTransferObject
{
    public ?int $page = 1;

    public ?int $per_page = 10;
}
