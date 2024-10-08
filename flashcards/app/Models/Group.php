<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasFactory;
 
    protected $fillable = ['title','user_id'];
   

    public function decks(): HasMany
    {
        return $this->hasMany(Deck::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}