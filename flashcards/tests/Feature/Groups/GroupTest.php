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


  public function test_create_group_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/createGroup');

        $response->assertOk();
    }

    public function test_can_create_update_and_delete_group(): void
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


        // Successfully view group page
          $response = $this
            ->actingAs($user)
            ->get("/group/{$group->id}");

        $response->assertOk();


        // Update
        $response = $this->patch("/group/updateTitle/{$group->id}", ['title' => 'Updated Group']);
        $response->assertStatus(302);
        $this->assertDatabaseHas('groups', ['title' => 'Updated Group']);

        // Delete
        $response = $this->delete("/group/delete/{$group->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('groups', ['id' => $group->id]);
        $this->assertDatabaseMissing('decks', ['id' => $deck->id]); // Ensure the group_id is removed from decks
    }


     public function test_requires_a_title_for_group_creation(): void
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

    $response = $this->actingAs($user)->post('/createGroup', [
  'decks' => [$deck->id],
    ]);

    $response->assertSessionHasErrors('title');
    }




    public function test_requires_at_least_one_deck(): void
    {
      $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/createGroup', [
    'title' => 'Sample Group'
    ]);


    $response->assertSessionHasErrors('decks');
    }

    
    public function test_requires_valid_deck_ids_for_group_creation(): void
{
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/createGroup', [
        'title' => 'Sample Group',
        'decks' => [999] // Assuming 999 is an invalid deck ID
    ]);

     // Assert that the response has validation errors for 'decks'
    $response->assertSessionHasErrors([
        'decks.0' => 'One or more selected decks do not exist.'
    ]);

    $this->assertDatabaseCount('groups', 0);
}

}