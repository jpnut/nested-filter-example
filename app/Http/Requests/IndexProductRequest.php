<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Product\IndexProductRequestParams;
use App\DataTransferObjects\Product\ProductFilterData;
use App\Support\Request\FetchRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class IndexProductRequest extends FetchRequest implements CodeGenRequest
{
    /**
     * @code-gen-property queryParams
     */
    public function queryParams(): IndexProductRequestParams
    {
        return new IndexProductRequestParams([
            'page'     => $this->has('page') ? intval($this->query('page')) : null,
            'per_page' => $this->has('per_page') ? intval($this->query('per_page')) : null,
            'filter'   => $this->has('filter')
                ? new ProductFilterData(json_decode($this->query('filter'), true))
                : null,
            'include'  => $this->query('include', []),
            'search'   => $this->has('search') ? strtolower($this->query('search')) : null,
        ]);
    }
}
