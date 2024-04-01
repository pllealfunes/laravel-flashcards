<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GroupDeck extends Model
{
    use HasFactory;

    protected $table = 'group_decks';
    protected $primaryKey = 'group_deck_id';
    public $timestamps = false;
}