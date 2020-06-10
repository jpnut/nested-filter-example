<?php

namespace App\Http\Controllers;

use App\Customer;
use App\DataTransferObjects\Customer\CustomerData;
use App\DataTransferObjects\Customer\IndexCustomerResponseData;
use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\IndexCustomerRequest;
use App\Http\Requests\ShowCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Support\Arr;

class CustomerController extends Controller
{
    private Customer $customer;

    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }

    /**
     * @param  \App\Http\Requests\CreateCustomerRequest  $request
     * @return \App\DataTransferObjects\Customer\CustomerData
     *
     * @code-gen
     */
    public function store(CreateCustomerRequest $request): CustomerData
    {
        return CustomerData::fromModel($request->data()->createModel());
    }

    /**
     * @param  \App\Customer  $customer
     * @return bool
     *
     * @code-gen
     */
    public function destroy(Customer $customer): bool
    {
        return $customer->delete();
    }

    /**
     * @param  \App\Http\Requests\ShowCustomerRequest  $request
     * @param  \App\Customer  $customer
     * @return \App\DataTransferObjects\Customer\CustomerData
     *
     * @code-gen
     */
    public function show(ShowCustomerRequest $request, Customer $customer): CustomerData
    {
        return CustomerData::fromModel($customer->load($request->queryParams()->include));
    }

    /**
     * @param  \App\Http\Requests\IndexCustomerRequest  $request
     * @return \App\DataTransferObjects\Customer\IndexCustomerResponseData
     *
     * @code-gen
     */
    public function index(IndexCustomerRequest $request): IndexCustomerResponseData
    {
        $params = $request->queryParams();

        $query = $this->customer->newQuery();

        $query = is_null($params->filter)
            ? $query
            : $params->filter->filter($query);

        return IndexCustomerResponseData::fromPaginator(
            $query
                ->where(function ($query) use ($params) {
                    if (is_null($params->search)) {
                        return $query;
                    }

                    return $query->whereRaw('LOWER(full_name) LIKE ?', ["%{$params->search}%"])
                        ->orWhereRaw('LOWER(reference) LIKE ?', ["%{$params->search}%"]);
                })
                ->orderBy('id', 'desc')
                ->with($params->include)
                ->paginate(
                    $params->per_page,
                    ['*'],
                    'page',
                    $params->page
                )
        );
    }

    /**
     * @param  \App\Http\Requests\UpdateCustomerRequest  $request
     * @param  \App\Customer  $customer
     * @return \App\DataTransferObjects\Customer\CustomerData
     *
     * @code-gen
     */
    public function update(UpdateCustomerRequest $request, Customer $customer): CustomerData
    {
        $data = $request->data();

        $customer->fill(
            Arr::only($data->toArray(), array_keys($request->validated()))
        );

        $customer->save();

        return CustomerData::fromModel($customer);
    }
}
