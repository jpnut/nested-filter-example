<?php

namespace App\Support\Filter;

use Illuminate\Database\Eloquent\Builder;
use JPNut\EloquentNestedFilter\AbstractFilterObject;
use JPNut\EloquentNestedFilter\Operator;

class IDFilterObject extends AbstractFilterObject
{
    public string $value;

    public Operator $operator;

    public function __construct(string $value, Operator $operator)
    {
        $this->value = $value;
        $this->operator = $operator;
    }

    public static function fromArray(array $properties = []): self
    {
        return new self(strval($properties['value'] ?? ''), static::operatorFromProperties($properties));
    }

    public function filter(string $name, Builder $query): Builder
    {
        if (!$this->value) {
            return $query;
        }

        if ($this->operator->equals(Operator::IS())) {
            return $query->whereKey($this->value);
        }

        if ($this->operator->equals(Operator::IS_NOT())) {
            return $query->whereKeyNot($this->value);
        }

        throw $this->invalidOperator($this->operator);
    }
}
