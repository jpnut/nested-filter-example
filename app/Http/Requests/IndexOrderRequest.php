<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Order\IndexOrderRequestParams;
use App\DataTransferObjects\Order\OrderFilterData;
use App\Support\Request\FetchRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class IndexOrderRequest extends FetchRequest implements CodeGenRequest
{
    /**
     * @code-gen-property queryParams
     */
    public function queryParams(): IndexOrderRequestParams
    {
        return new IndexOrderRequestParams([
            'page'     => $this->has('page') ? intval($this->query('page')) : null,
            'per_page' => $this->has('per_page') ? intval($this->query('per_page')) : null,
            'filter'   => $this->has('filter')
                ? new OrderFilterData(json_decode($this->query('filter'), true))
                : null,
            'include'  => $this->query('include', []),
        ]);
    }
}
