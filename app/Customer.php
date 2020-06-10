<?php

namespace App;

use App\Events\CustomerCreating;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name',
        'email',
        'phone',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'creating' => CustomerCreating::class,
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
