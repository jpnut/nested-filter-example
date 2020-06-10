<?php

namespace App\DataTransferObjects\Order;

use App\Order;
use App\Support\DataTransferObject\PaginationMetaData;
use App\Support\DataTransferObject\ResponsableDataTransferObject;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class IndexOrderResponseData extends ResponsableDataTransferObject
{
    public OrderCollection $data;

    public PaginationMetaData $meta;

    public static function fromPaginator(LengthAwarePaginator $paginator): self
    {
        return new static([
            'data' => new OrderCollection(array_map(
                fn(Order $order) => OrderData::fromModel($order),
                $paginator->items()
            )),
            'meta' => PaginationMetaData:: fromPaginator($paginator),
        ]);
    }
}
