<?php

namespace App\DataTransferObjects\Customer;

use App\Customer;
use App\Support\DataTransferObject\PaginationMetaData;
use App\Support\DataTransferObject\ResponsableDataTransferObject;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class IndexCustomerResponseData extends ResponsableDataTransferObject
{
    public CustomerCollection $data;

    public PaginationMetaData $meta;

    public static function fromPaginator(LengthAwarePaginator $paginator): self
    {
        return new static([
            'data' => new CustomerCollection(array_map(
                fn(Customer $customer) => CustomerData::fromModel($customer),
                $paginator->items()
            )),
            'meta' => PaginationMetaData:: fromPaginator($paginator),
        ]);
    }
}
