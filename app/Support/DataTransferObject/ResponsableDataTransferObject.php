<?php

namespace App\Support\DataTransferObject;

use Illuminate\Contracts\Support\Responsable;
use Spatie\DataTransferObject\DataTransferObject;

class ResponsableDataTransferObject extends DataTransferObject implements Responsable
{
    private int $__response_status = 200;

    private array $__response_headers = [];

    private int $__response_options = 0;

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function toResponse($request)
    {
        return response()->json(
            $this->toArray(),
            $this->__response_status,
            $this->__response_headers,
            $this->__response_options
        );
    }

    public function withStatus(int $status): self
    {
        $this->__response_status = $status;

        return $this;
    }

    public function withHeaders(array $headers): self
    {
        $this->__response_headers = $headers;

        return $this;
    }

    public function withOptions(int $options): self
    {
        $this->__response_options = $options;

        return $this;
    }
}
