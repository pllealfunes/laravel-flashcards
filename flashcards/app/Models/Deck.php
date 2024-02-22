<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = [
    "lastviewed"
    ];


    protected $casts = [
        'cards' => 'array'
    ];

    public function user(): BelongsTo

    {

        return $this->belongsTo(User::class);

    }
}