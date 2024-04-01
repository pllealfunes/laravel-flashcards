<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Group extends Model
{
    use HasFactory;
    protected $primaryKey = 'group_id';
    protected $fillable = ['title'];

    public function decks(): BelongsToMany
    {
        return $this->belongsToMany(Deck::class, 'group_decks', 'group_id', 'deck_id')
                    ->withTimestamps();
    }

}