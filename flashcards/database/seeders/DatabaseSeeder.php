<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
         Deck::factory()
            ->count(1)
            ->hasFlashcards(20) // Assuming you set up a hasFlashcards relationship
            ->create();
    }
}