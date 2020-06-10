<?php

namespace App\DataTransferObjects\Product;

use App\Http\Requests\CreateProductRequest;
use App\Product;
use App\Support\DataTransferObject\HasDates;
use Carbon\Carbon;
use Spatie\DataTransferObject\DataTransferObject;

class CreateProductData extends DataTransferObject
{
    use HasDates;

    public string $name;

    public ?string $description;

    public int $amount;

    public ?Carbon $published_at;

    public ?Carbon $archived_at;

    public ?bool $available;

    public static function fromRequest(CreateProductRequest $request): self
    {
        return new self([
            'name'         => $request->input('name'),
            'description'  => $request->input('description'),
            'amount'       => intval($request->input('amount')),
            'published_at' => static::parseCarbon($request->input('published_at')),
            'archived_at'  => static::parseCarbon($request->input('archived_at')),
            'available'    => $request->has('available') ? boolval($request->input('available')) : null,
        ]);
    }

    public function createModel(): Product
    {
        $product = new Product([
            'name'         => $this->name,
            'description'  => $this->description,
            'amount'       => $this->amount,
            'published_at' => $this->published_at,
            'archived_at'  => $this->archived_at,
            'available'    => $this->available,
        ]);

        $product->save();

        return $product;
    }
}
