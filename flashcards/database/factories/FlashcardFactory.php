<?php

namespace Database\Factories;

use App\Models\Deck;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flashcard>
 */
class FlashcardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question' => $this->faker->sentence(),
            'answer' => fake()->paragraph(),
            'hint' => fake()->sentence(),
            'difficulty' => fake()->randomElement(['easy', 'medium', 'hard']),
            'points' => fake()->randomElement(['1', '3', '5']),
            'user_id' => User::factory(),
            'deck_id' => Deck::factory()
        ];
    }
}