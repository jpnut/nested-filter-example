<?php

namespace App\Http\Requests;

use App\DataTransferObjects\Customer\CustomerFilterData;
use App\DataTransferObjects\Customer\IndexCustomerRequestParams;
use App\Support\Request\FetchRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class IndexCustomerRequest extends FetchRequest implements CodeGenRequest
{
    /**
     * @return \App\DataTransferObjects\Customer\IndexCustomerRequestParams
     *
     * @code-gen-property queryParams
     */
    public function queryParams(): IndexCustomerRequestParams
    {
        return new IndexCustomerRequestParams([
            'page'     => $this->has('page') ? intval($this->query('page')) : null,
            'per_page' => $this->has('per_page') ? intval($this->query('per_page')) : null,
            'filter'   => $this->has('filter')
                ? new CustomerFilterData(json_decode($this->query('filter'), true))
                : null,
            'include'  => $this->query('include', []),
            'search'   => $this->has('search') ? strtolower($this->query('search')) : null,
        ]);
    }
}
