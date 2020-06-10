<?php

namespace App\Http\Requests;

use App\Support\DataTransferObject\ShowRequestParams;
use App\Support\Request\FetchRequest;
use JPNut\CodeGen\Contracts\CodeGenRequest;

class ShowProductRequest extends FetchRequest implements CodeGenRequest
{
    /**
     * @code-gen-property queryParams
     */
    public function queryParams(): ShowRequestParams
    {
        return new ShowRequestParams([
            'include' => $this->query('include', []),
        ]);
    }
}
