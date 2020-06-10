<?php

namespace App\Support\DataTransferObject;

use Carbon\Carbon;

trait HasDates
{
    private static function parseCarbon(?string $value): ?Carbon
    {
        return !is_null($value) || strlen($value) > 0 ? Carbon::parse($value) : null;
    }
}
