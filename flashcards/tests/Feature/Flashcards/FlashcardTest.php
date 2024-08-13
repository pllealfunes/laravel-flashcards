<?php

namespace Tests\Feature;

use App\Models\Deck;
use App\Models\Flashcard;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FlashcardTest extends TestCase
{
    use RefreshDatabase;


    public function it_can_create_a_flashcard(): void
    {
        $user = User::factory()->create();
        $deck = Deck::factory()->create(['user_id' => $user->id]);

           $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get("/deck/updateDeck/{$deck->id}");

        $response->assertOk();

        $response = $this->actingAs($user)->post('/deck/createFlashcard', [
            'deck_id' => $deck->id,
            'question' => 'Sample Question',
            'answer' => 'Sample Answer',
            'hint' => 'Sample Hint',
            'difficulty' => 'easy',
            'points' => 1,
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('flashcards', [
            'question' => 'Sample Question',
            'answer' => 'Sample Answer',
            'deck_id' => $deck->id,
        ]);
    }

      public function test_update_deck_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/createGroup');

        $response->assertOk();
    }

    public function it_can_update_a_flashcard(): void
{
    $user = User::factory()->create();
    $flashcard = Flashcard::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->put("/deck/updateFlashcard/{$flashcard->id}", [
        'question' => 'Updated Question',
        'answer' => 'Updated Answer',
        'hint' => 'Updated Hint',
        'difficulty' => 'medium',
        'points' => 3,
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('flashcards', [
        'id' => $flashcard->id,
        'question' => 'Updated Question',
        'answer' => 'Updated Answer',
    ]);
}


public function test_cannot_update_flashcard_with_invalid_data(): void
{
    $user = User::factory()->create();
    $flashcard = Flashcard::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->put("/deck/updateFlashcard/{$flashcard->id}", [
        'question' => '',
        'answer' => 'Updated Answer',
        'difficulty' => 'invalid',
        'points' => 10,
    ]);

    $response->assertSessionHasErrors(['question', 'difficulty', 'points']);
}

public function test_can_delete_a_flashcard(): void
{
    $user = User::factory()->create();
    $flashcard = Flashcard::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->delete("/deck/deleteFlashcard/{$flashcard->id}");

    $response->assertStatus(302);
    $this->assertDatabaseMissing('flashcards', ['id' => $flashcard->id]);
}


public function test_cannot_delete_flashcard_if_not_owned_by_user(): void
{
    // Create two users
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    
    // Create a flashcard owned by the other user
    $flashcard = Flashcard::factory()->create(['user_id' => $otherUser->id]);

    // Act as the current user and attempt to delete the flashcard
    $response = $this->actingAs($user)->delete("/deck/deleteFlashcard/{$flashcard->id}");

  if ($response->isRedirect()) {
        $response->assertStatus(302); // Redirect status
        $this->assertDatabaseHas('flashcards', ['id' => $flashcard->id]); // Ensure flashcard still exists
    } else {
        // Assert that the response status is 403 Forbidden
        $response->assertStatus(403);
        // Assert that the flashcard still exists in the database
        $this->assertDatabaseHas('flashcards', ['id' => $flashcard->id]);
    }
}
}