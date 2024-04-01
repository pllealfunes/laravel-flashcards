<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = [
    "title",
    "user_id"
    ];


    public function user(): BelongsTo

    {

        return $this->belongsTo(User::class);

    }

    public function flashcards(): hasMany
    {
        return $this->hasMany(Flashcard::class);
    }

    public function groups(): HasMany
    {
        return $this->hasMany(Deck::class, 'deck_id', 'deck_id');
    }
}