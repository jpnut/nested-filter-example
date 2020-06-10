<?php

namespace App\Http\Requests;

use App\Support\DataTransferObject\ShowRequestParams;
use App\Support\Request\FetchRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class ShowCustomerRequest extends FetchRequest implements CodeGenRequest
{
    /**
     * @return \App\Support\DataTransferObject\ShowRequestParams
     *
     * @code-gen-property queryParams
     */
    public function queryParams(): ShowRequestParams
    {
        return new ShowRequestParams([
            'include' => $this->query('include', []),
        ]);
    }
}
