<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = [
    "title",
    "user_id",
    "group_id"
    ];


    public function user(): BelongsTo

    {

        return $this->belongsTo(User::class);

    }

    public function flashcards(): hasMany
    {
        return $this->hasMany(Flashcard::class);
    }

    public function groups(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}