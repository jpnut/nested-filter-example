<?php

namespace App\DataTransferObjects\Product;

use App\Product;
use App\Support\DataTransferObject\PaginationMetaData;
use App\Support\DataTransferObject\ResponsableDataTransferObject;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class IndexProductResponseData extends ResponsableDataTransferObject
{
    public ProductCollection $data;

    public PaginationMetaData $meta;

    public static function fromPaginator(LengthAwarePaginator $paginator): self
    {
        return new static([
            'data' => new ProductCollection(
                array_map(
                    fn(Product $product) => ProductData::fromModel($product),
                    $paginator->items()
                )
            ),
            'meta' => PaginationMetaData:: fromPaginator($paginator),
        ]);
    }
}
