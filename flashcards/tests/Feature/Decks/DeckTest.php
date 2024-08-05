<?php

namespace Tests\Unit\Decks;

use Tests\TestCase;
use App\Models\Deck;
use App\Models\Flashcard;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;



class DeckTest extends TestCase
    {
    use RefreshDatabase;


    public function test_create_deck_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/createdeck');

        $response->assertOk();
    }


    public function it_can_create_a_deck_with_flashcards()
    {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/createdeck', [
    'title' => 'Sample Deck',
    'user_id' => $user -> id,
    'group_id' => NULL,
    'flashcards' => [
    [
    'question' => 'Question 1',
    'answer' => 'Answer 1',
    'hint' => 'Hint 1',
    'difficulty' => 'easy',
    'points' => 1,
    'user_id' => $user -> id,
    ],
    [
    'question' => 'Question 2',
    'answer' => 'Answer 2',
    'hint' => 'Hint 2',
    'difficulty' => 'medium',
    'points' => 3,
    'user_id' => $user -> id,
    ]
    ]
    ]);

    // Assert that the response has the correct status
        $response->assertStatus(302);

        // Assert that a success message is present in the session
        $response->assertSessionHas('success');

    $deck = Deck::where('title', 'Sample Deck')->first();
    $this->assertNotNull($deck);
    $this->assertEquals('Sample Deck', $deck->title);
    $this->assertCount(2, $deck->flashcards);

    $this->assertDatabaseHas('decks', ['title' => 'Sample Deck']);
    $this->assertDatabaseHas('flashcards', ['question' => 'Question 1']);
    $this->assertDatabaseHas('flashcards', ['question' => 'Question 2']);
    }




    public function it_requires_a_title_for_deck_creation()
    {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/createdeck', [
    'flashcards' => [
    [
    'question' => 'Question 1',
    'answer' => 'Answer 1',
    'hint' => 'Hint 1',
    'difficulty' => 'easy',
    'points' => 1,
      'user_id' => $user -> id,
    ],
    [
    'question' => 'Question 2',
    'answer' => 'Answer 2',
    'hint' => 'Hint 2',
    'difficulty' => 'medium',
    'points' => 3,
    'user_id' => $user -> id,
    ]
    ]
    ]);

    $response->assertSessionHasErrors('title');
    $this->assertDatabaseCount('decks', 0);
    }




    public function it_requires_at_least_two_flashcards()
    {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/createdeck', [
    'title' => 'Sample Deck',
    'flashcards' => [
    [
    'question' => 'Question 1',
    'answer' => 'Answer 1',
    'hint' => 'Hint 1',
    'difficulty' => 'easy',
    'points' => 1,
    'user_id' => $user -> id,
    ]
    ]
    ]);

    $response->assertSessionHasErrors('flashcards');
    $this->assertDatabaseCount('decks', 0);
    }




    public function it_requires_valid_flashcard_data()
    {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/createdeck', [
    'title' => 'Sample Deck',
    'flashcards' => [
    [
    'question' => '',
    'answer' => 'Answer 1',
    'hint' => 'Hint 1',
    'difficulty' => 'invalid',
    'points' => 10,
    'user_id' => $user -> id,
    ],
    [
    'question' => 'Question 2',
    'answer' => 'Answer 2',
    'hint' => 'Hint 2',
    'difficulty' => 'medium',
    'points' => 3,
    'user_id' => $user -> id,
    ]
    ]
    ]);

    $response->assertSessionHasErrors(['flashcards.0.question', 'flashcards.0.difficulty', 'flashcards.0.points']);
    $this->assertDatabaseCount('decks', 0);
    }


        public function it_can_create_update_and_delete_deck()
        {
            $user = User::factory()->create();

            $response = $this->actingAs($user)->post('/createdeck', [
            'title' => 'Sample Deck',
            'user_id' => $user -> id,
            'group_id' => NULL,
            'flashcards' => [
            [
            'question' => 'Question 1',
            'answer' => 'Answer 1',
            'hint' => 'Hint 1',
            'difficulty' => 'easy',
            'points' => 1,
            'user_id' => $user -> id,
            ],
            [
            'question' => 'Question 2',
            'answer' => 'Answer 2',
            'hint' => 'Hint 2',
            'difficulty' => 'medium',
            'points' => 3,
            'user_id' => $user -> id,
            ]
            ]
            ]);

    // Assert that the response has the correct status
        $response->assertStatus(302);

        $deck = Deck::where('title', 'Sample Deck')->first();

            // Update
            $response = $this->patch("/deck/updateTitle/{$deck->id}", ['title' => 'Updated Deck']);
            $response->assertStatus(302);
            $this->assertDatabaseHas('decks', ['title' => 'Updated Deck']);

            // Delete
            $response = $this->delete("/deck/{$deck->id}");
            $response->assertStatus(302);
            $this->assertDatabaseMissing('decks', ['id' => $deck->id]);
        }

    }