<?php

namespace App\Http\Controllers;

use App\DataTransferObjects\Product\IndexProductResponseData;
use App\DataTransferObjects\Product\ProductData;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\IndexProductRequest;
use App\Http\Requests\ShowProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Product;

class ProductController extends Controller
{
    private Product $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * @param  \App\Http\Requests\CreateProductRequest  $request
     * @return \App\DataTransferObjects\Product\ProductData
     *
     * @code-gen
     */
    public function store(CreateProductRequest $request): ProductData
    {
        return ProductData::fromModel($request->data()->createModel());
    }

    /**
     * @param  \App\Product  $product
     * @return bool
     *
     * @code-gen
     */
    public function destroy(Product $product): bool
    {
        return $product->delete();
    }

    /**
     * @param  \App\Http\Requests\ShowProductRequest  $request
     * @param  \App\Product  $product
     * @return \App\DataTransferObjects\Product\ProductData
     *
     * @code-gen
     */
    public function show(ShowProductRequest $request, Product $product): ProductData
    {
        return ProductData::fromModel($product->load($request->queryParams()->include));
    }

    /**
     * @param  \App\Http\Requests\IndexProductRequest  $request
     * @return \App\DataTransferObjects\Product\IndexProductResponseData
     *
     * @code-gen
     */
    public function index(IndexProductRequest $request): IndexProductResponseData
    {
        $params = $request->queryParams();

        $query = $this->product->newQuery();

        $query = is_null($params->filter)
            ? $query
            : $params->filter->filter($query);

        return IndexProductResponseData::fromPaginator(
            $query
                ->where(function ($query) use ($params) {
                    if (is_null($params->search)) {
                        return $query;
                    }

                    return $query->whereRaw('LOWER(name) LIKE ?', ["%{$params->search}%"])
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
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Product  $product
     * @return \App\DataTransferObjects\Product\ProductData
     *
     * @code-gen
     */
    public function update(UpdateProductRequest $request, Product $product): ProductData
    {
        return ProductData::fromModel($request->data()->updateModel($product, array_keys($request->validated())));
    }
}
