<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Deck;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class GroupsController extends Controller
{
   
    /**
     * Show the form for creating a new group.
     */
    public function create()
    {
       
        // Get the currently logged-in user
           $user = Auth::user();

        // Fetch all decks belonging to the current user with NULL group_id
            $decks = Deck::where('user_id', $user->id)
            ->whereNull('group_id')
            ->paginate(10);

            return Inertia::render('Groups/CreateGroup', ['availableDecks' => $decks]);
    }

    /**
     * Store a newly created group in storage.
     */
 public function store(Request $request): RedirectResponse
{
     $validated = $request->validate([
        'title' => 'required|string|max:255',
        'decks' => 'required|array',
        'decks.*' => 'exists:decks,id', // Ensure each deck ID exists
    ], [
        'decks.required' => 'You must select at least one deck.',
        'decks.array' => 'The decks field must be an array.',
        'decks.*.exists' => 'One or more selected decks do not exist.',
    ]);

    // Ensure the user is authenticated
    if (!$request->user()) {
        return redirect()->back()->with('error', 'Unauthorized');
    }

    try {
        // Create the group
        $group = Group::create([
            'title' => $validated['title'],
            'user_id' => $request->user()->id,
        ]);

        // Associate selected decks with the group
        foreach ($validated['decks'] as $deckId) {
            Deck::where('id', $deckId)->update(['group_id' => $group->id]);
        }

        // Redirect with success message
        return redirect(route('dashboard'))->with('success', 'Group created successfully.');
        
    } catch (\Exception $e) {
        // Handle other exceptions with a generic error message
        return redirect()->back()->with('error', 'There was an error creating the group.');
    }
}

   
 /**
 * Display the specified group.
 */
public function show(Group $group)
{
     $user = Auth::user();
    // Update the group's last viewed timestamp
    $group->lastviewed = Carbon::now()->toIso8601String();
    $group->save();

   // Retrieve user's decks assigned to the group with pagination
    $userDecks = Deck::where('group_id', $group->id)
                     ->where('user_id', $user->id) // Ensure it's the authenticated user's decks
                     ->paginate(10); // 10 decks per page

    // Transform the paginated decks to include only specified details
    $userDecks->getCollection()->transform(function ($deck) {
        return [
            'id' => $deck->id,
            'title' => $deck->title,
            'lastviewed' => $deck->lastviewed,
            'created_at' => $deck->created_at,
            'updated_at' => $deck->updated_at,
        ];
    });

    return Inertia::render('Groups/ViewGroup', [
        'group' => $group,
        'userDecks' => $userDecks
    ]);
}


         /**
     * Update Group Title
     */
    public function updateTitle(Request $request, Group $group)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);
    
        try {
            if ($group->user_id === $request->user()->id) {
               $group->update(['title' => $validated['title']]); 
            } else {
                // Handle unauthorized deletion attempts with a 403 status code
                abort(403, 'Unauthorized');
            }
         
            return back()->with('success', 'Deck title updated successfully.');
        } catch (ModelNotFoundException $e) {
            // Handle the case where the deck is not found with a 404 status code
            abort(404, 'Deck not found');
        } catch (\Exception $e) {
            // Handle other potential exceptions with a generic error message
            return back()->with('error', 'An error occurred while  updating the title.');
        }
    }


public function showAddDeck($groupId)
{
     $user = Auth::user();

       $availableDecks = Deck::whereNull('group_id')
                     ->where('user_id', $user->id) // Ensure it's the authenticated user's decks
                     ->paginate(10); // 10 decks per page

      $availableDecks->getCollection()->transform(function ($deck) {
        return [
            'id' => $deck->id,
            'title' => $deck->title,
            'lastviewed' => $deck->lastviewed,
            'created_at' => $deck->created_at,
            'updated_at' => $deck->updated_at,
        ];
    });

    return Inertia::render('Groups/AddDeck', [
        'availableDecks' => $availableDecks,
        'groupId' => $groupId
    ]);
}
           /**
     * Add new Decks to the Group
     */
    public function addDeck(Request $request, $groupId)
    {
        $validated = $request->validate([
             'decks' => 'required|array', // Assuming 'decks' is an array of deck IDs
        ]);


        // Fetch the Group model
        $group = Group::find($groupId);

        // Check if the group exists
        if (!$group) {
            abort(404, 'Group not found');
        }
    
        try {
            if ($group->user_id === $request->user()->id) {
                
                 foreach ($validated['decks'] as $deckId) {
                
                Deck::where('id', $deckId)->update(['group_id' => $group->id]);
        }
            } else {
                // Handle unauthorized deletion attempts with a 403 status code
                abort(403, 'Unauthorized');
            }
         
            return back()->with('success', 'Deck added to group successfully.');
        } catch (ModelNotFoundException $e) {
            // Handle the case where the deck is not found with a 404 status code
            abort(404, 'Deck not found');
        } catch (\Exception $e) {
            // Handle other potential exceptions with a generic error message
            return back()->with('error', $e);
        }
    }



/**
 * Remove Deck from Group
 */
public function removeDeck($deckId)
{
    try { 
        $deck = Deck::findOrFail($deckId);
        $deck->group_id = null;
        $deck->save();

        return back()->with('success', 'Deck Removed From Group Successfully.');
        
    } catch (ModelNotFoundException $e) {
        // Handle the case where the deck is not found with a 404 status code
        abort(404, 'Deck not found');
    } catch (\Exception $e) {
        // Handle other potential exceptions with a generic error message
        return back()->with('error', 'An error occurred while removing the deck.');
    }
}


     /**
     * Delete Group but Keep the Decks.
     */
    
     public function keepDecks(Request $request, Group $group)
{
    try {
        // Ensure that the deck belongs to the authenticated user
        if ($group->user_id === $request->user()->id) {
             // Ensure that the deck belongs             
        // Get all decks belonging to the group
        $decks = Deck::where('group_id', $group->id)->get();

        // Update the group_id to NULL for each deck
        foreach ($decks as $deck) {
            $deck->group_id = null;
            $deck->save();
        }

            // Delete the group
            $group->delete();
            $group->user()->dissociate();
            // If the deletion was successful and authorized, redirect to dashboard
            return redirect(route('dashboard'))->with('success', 'Successfully Deleted Group.');
        } else {
            // Handle unauthorized deletion attempts with a 403 status code
            abort(403, 'Unauthorized');
        }
    } catch (ModelNotFoundException $e) {
        // Handle the case where the deck is not found with a 404 status code
        abort(404, 'Group not found');
    } catch (\Exception $e) {
        // Handle other potential exceptions with a generic error message
        return back()->with('error', 'An error occurred while deleting the group.');
    }
}


/**
     * Delete Group and all Decks inside.
     */
    
     public function destroy(Request $request, Group $group)
{
    try {
        // Ensure that the deck belongs to the authenticated user
        if ($group->user_id === $request->user()->id) {
            // Delete the group
            $group->delete();
            $group->user()->dissociate();
            // If the deletion was successful and authorized, redirect to dashboard
            return redirect(route('dashboard'))->with('success', 'Successfully Deleted Group.');
        } else {
            // Handle unauthorized deletion attempts with a 403 status code
            abort(403, 'Unauthorized');
        }
    } catch (ModelNotFoundException $e) {
        // Handle the case where the deck is not found with a 404 status code
        abort(404, 'Group not found');
    } catch (\Exception $e) {
        // Handle other potential exceptions with a generic error message
        return back()->with('error', 'An error occurred while deleting the group.');
    }
}

}