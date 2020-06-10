<?php

namespace App\DataTransferObjects\Customer;

use App\Http\Requests\UpdateCustomerRequest;
use Spatie\DataTransferObject\DataTransferObject;

class UpdateCustomerData extends DataTransferObject
{
    public ?string $full_name;

    public ?string $email;

    public ?string $phone;

    public static function fromRequest(UpdateCustomerRequest $request): self
    {
        return new self([
            'full_name' => $request->input('full_name'),
            'email'     => $request->input('email'),
            'phone'     => $request->input('phone'),
        ]);
    }
}
