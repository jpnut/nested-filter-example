<?php

namespace App\DataTransferObjects\Customer;

use App\Customer;
use App\Http\Requests\CreateCustomerRequest;
use Spatie\DataTransferObject\DataTransferObject;

class CreateCustomerData extends DataTransferObject
{
    public string $full_name;

    public ?string $email;

    public ?string $phone;

    public static function fromRequest(CreateCustomerRequest $request): self
    {
        return new self([
            'full_name' => $request->input('full_name'),
            'email'     => $request->input('email'),
            'phone'     => $request->input('phone'),
        ]);
    }

    public function createModel(): Customer
    {
        $customer = new Customer([
            'full_name' => $this->full_name,
            'email'     => $this->email,
            'phone'     => $this->phone,
        ]);

        $customer->save();

        return $customer;
    }
}
