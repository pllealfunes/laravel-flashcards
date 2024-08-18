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
        // Create specific users for testing
        $specificUsers = [
            [
                'name' => 'Beth Thomas',
                'email' => 'beth99@email.com',
                'password' => bcrypt('bethmary99'),
            ],
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => bcrypt('password123'),
            ],
        ];

        foreach ($specificUsers as $userData) {
            $user = User::create($userData);

            // Create a deck associated with the specific user
            $deck = Deck::factory()->create([
                'user_id' => $user->id,
            ]);

            // Create flashcards associated with the specific user's deck
            Flashcard::factory(20)->create([
                'deck_id' => $deck->id,
                'user_id' => $user->id,
            ]);
        }
    }
}