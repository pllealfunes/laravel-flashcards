<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Flashcard;
use App\Models\Deck;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         // Create a single user
        $user = User::factory()->create();

        // Create a single deck associated with the user
        $deck = Deck::factory()->create([
            'user_id' => $user->id,
        ]);

        // Create 20 flashcards associated with the deck and user
        Flashcard::factory()->count(20)->create([
            'deck_id' => $deck->id,
            'user_id' => $user->id,
        ]);
    }
}