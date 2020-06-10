<?php

namespace App\Http\Controllers;

use App\DataTransferObjects\Order\IndexOrderResponseData;
use App\DataTransferObjects\Order\OrderData;
use App\Http\Requests\CreateOrderRequest;
use App\Http\Requests\IndexOrderRequest;
use App\Http\Requests\ShowOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Order;

class OrderController extends Controller
{
    private Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * @param  \App\Http\Requests\CreateOrderRequest  $request
     * @return \App\DataTransferObjects\Order\OrderData
     *
     * @code-gen
     */
    public function store(CreateOrderRequest $request): OrderData
    {
        return OrderData::fromModel($request->data()->createModel());
    }

    /**
     * @param  \App\Order  $order
     * @return bool
     *
     * @code-gen
     */
    public function destroy(Order $order): bool
    {
        return $order->delete();
    }

    /**
     * @param  \App\Http\Requests\ShowOrderRequest  $request
     * @param  \App\Order  $order
     * @return \App\DataTransferObjects\Order\OrderData
     *
     * @code-gen
     */
    public function show(ShowOrderRequest $request, Order $order): OrderData
    {
        return OrderData::fromModel($order->load($request->queryParams()->include));
    }

    /**
     * @param  \App\Http\Requests\IndexOrderRequest  $request
     * @return \App\DataTransferObjects\Order\IndexOrderResponseData
     *
     * @code-gen
     */
    public function index(IndexOrderRequest $request): IndexOrderResponseData
    {
        $params = $request->queryParams();

        $query = $this->order->newQuery();

        $query = is_null($params->filter)
            ? $query
            : $params->filter->filter($query);

        return IndexOrderResponseData::fromPaginator(
            $query
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
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Order  $order
     * @return \App\DataTransferObjects\Order\OrderData
     *
     * @code-gen
     */
    public function update(UpdateOrderRequest $request, Order $order): OrderData
    {
        return OrderData::fromModel($request->data()->updateModel($order, array_keys($request->validated())));
    }
}
