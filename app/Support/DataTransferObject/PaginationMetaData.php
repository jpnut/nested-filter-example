<?php

namespace App\Support\DataTransferObject;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\DataTransferObject\DataTransferObject;

class PaginationMetaData extends DataTransferObject
{
    public int $current_page;

    public ?int $from;

    public int $last_page;

    public int $per_page;

    public ?int $to;

    public int $total;

    public static function fromPaginator(LengthAwarePaginator $paginator): PaginationMetaData
    {
        return new static([
            'current_page' => $paginator->currentPage(),
            'from'         => $paginator->firstItem(),
            'last_page'    => $paginator->lastPage(),
            'per_page'     => $paginator->perPage(),
            'to'           => $paginator->lastItem(),
            'total'        => $paginator->total(),
        ]);
    }
}
