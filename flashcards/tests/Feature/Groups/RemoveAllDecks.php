<?php

namespace Tests\Unit\Decks;

use Tests\TestCase;
use App\Models\Group;
use App\Models\Deck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;



class GroupTest extends TestCase
{
use RefreshDatabase;



    public function it_can_remove_all_decks_from_group()
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

       // Create a group and associate the deck
        $response = $this->actingAs($user)->post('/createGroup', [
            'title' => 'Sample Group',
            'decks' => [$deck->id],
        ]);

         // Assert creation
        $response->assertStatus(302);
        $this->assertDatabaseHas('groups', ['title' => 'Sample Group']);
        $this->assertDatabaseHas('decks', ['id' => $deck->id, 'group_id' => Group::where('title', 'Sample Group')->first()->id]);

        $group = Group::where('title', 'Sample Group')->first();

        // Delete
        $response = $this->delete("/group/keepDecks{$group->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('groups', ['id' => $group->id]);
       $this->assertDatabaseHas('decks', ['title' => 'Sample Deck','group_id' => NULL]);
    }

}