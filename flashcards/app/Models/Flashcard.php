<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Flashcard extends Model
{
    use HasFactory;

    protected $fillable = ["question", "answer", "hint", "difficulty","points","deck_id", "user_id"];
   
        public function user(): BelongsTo
    
        {
    
            return $this->belongsTo(User::class);
    
        }
    
        public function flashcards(): BelongsTo
        {
            return $this->belongsTo(Deck::class);
        }

}