<?php

namespace App\DataTransferObjects\Product;

use App\Http\Requests\UpdateProductRequest;
use App\Product;
use App\Support\DataTransferObject\HasDates;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Spatie\DataTransferObject\DataTransferObject;

class UpdateProductData extends DataTransferObject
{
    use HasDates;

    public ?string $name;

    public ?string $description;

    public ?Carbon $published_at;

    public ?Carbon $archived_at;

    public ?bool $available;

    public static function fromRequest(UpdateProductRequest $request): self
    {
        return new self([
            'name'         => $request->has('name') ? $request->input('name') : null,
            'description'  => $request->has('description') ? $request->input('description') : null,
            'published_at' => static::parseCarbon($request->input('published_at')),
            'archived_at'  => static::parseCarbon($request->input('archived_at')),
            'available'    => $request->has('available') ? boolval($request->input('available')) : null,
        ]);
    }

    public function updateModel(Product $product, array $validated): Product
    {
        $product->fill(
            Arr::only(
                [
                    'name'         => $this->name,
                    'description'  => $this->description,
                    'published_at' => $this->published_at,
                    'archived_at'  => $this->archived_at,
                    'available'    => $this->available,
                ],
                $validated
            )
        );

        $product->save();

        return $product;
    }
}
