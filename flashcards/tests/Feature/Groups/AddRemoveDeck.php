<?php

namespace Tests\Unit\Decks;

use App\Models\Group;
use App\Models\Deck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;



class GroupTest extends TestCase
{
use RefreshDatabase;



    public function it_can_add_and_remove_one_deck_from_group(): void
    {
        $user = User::factory()->create();

    $firstCreateDeck = $this->actingAs($user)->post('/createdeck', [
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

    $secondCreateDeck = $this->actingAs($user)->post('/createdeck', [
        'title' => 'Sample Deck 2',
        'user_id' => $user -> id,
        'group_id' => NULL,
        'flashcards' => [
        [
        'question' => 'Question 3',
        'answer' => 'Answer 3',
        'hint' => 'Hint 3',
        'difficulty' => 'easy',
        'points' => 1,
        'user_id' => $user -> id,
        ],
        [
        'question' => 'Question 4',
        'answer' => 'Answer 4',
        'hint' => 'Hint 4',
        'difficulty' => 'medium',
        'points' => 3,
        'user_id' => $user -> id,
        ]
        ]
        ]);

       // Assert that the response has the correct status
        $firstCreateDeck->assertStatus(302);
        $secondCreateDeck->assertStatus(302);

        $firstDeck = Deck::where('title', 'Sample Deck')->first();
        $secondDeck = Deck::where('title', 'Sample Deck 2')->first();

       // Create a group and associate the deck
        $response = $this->actingAs($user)->post('/createGroup', [
            'title' => 'Sample Group',
            'decks' => [$firstDeck->id],
        ]);

         // Assert creation
        $response->assertStatus(302);
        $this->assertDatabaseHas('groups', ['title' => 'Sample Group']);
        $this->assertDatabaseHas('decks', ['id' => $firstDeck->id, 'group_id' => Group::where('title', 'Sample Group')->first()->id]);

        $group = Group::where('title', 'Sample Group')->first();

        // Add Deck to Group
        $response = $this->patch("/group/addDeck/{$group->id}");
        $this->assertDatabaseHas('decks', ['id' => $secondDeck->id, 'group_id' => Group::where('title', 'Sample Group 2')->first()->id]);


        // Delete
        $response = $this->patch("/group/removeDeck/{$group->id}");
        $response->assertStatus(302);
         $this->assertDatabaseMissing('decks', ['id' => $secondDeck->id, 'group_id' => $group->id]);
          $this->assertDatabaseHas('decks', ['id' => $secondDeck->id, 'group_id' => NULL]);

    }

}