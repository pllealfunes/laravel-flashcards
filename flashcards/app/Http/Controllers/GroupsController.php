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
            ->get();

            return Inertia::render('Groups/CreateGroup', ['decks' => $decks]);
    }

    /**
     * Store a newly created group in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'decks' => 'required|array', // Assuming 'decks' is an array of deck IDs
        ]);
    
        // Ensure that the user is authenticated before creating the group
        if ($request->user()) {
            $group = Group::create([
                'title' => $validated['title'],
                'user_id' => $request->user()->id,
            ]);
    
        // Associate selected decks with the group by creating Deck records with group_id set to the group's ID
        foreach ($validated['decks'] as $deckId) {

            Deck::where('id', $deckId)->update(['group_id' => $group->id]);
        }
    
            return  redirect(route('dashboard'))->with('success', 'Group created successfully.');
        } else{
            return redirect()->back()->with('error', 'Unable to create group.');
        }
    }

    /**
     * Display the specified group.
     */
    public function show(Group $group)
    {
         // Format Carbon instance to Laravel's default datetime format
    $lastViewed = Carbon::now() -> toIso8601String();
    $group->lastviewed = $lastViewed;
    $group->save();

        $userDecks = Deck::where('group_id', $group->id)->get();
        $availableDecks = Deck::where('group_id', null)->get();

        return Inertia('Groups/ViewGroup', [
            'group' => $group,
            'userDecks' => $userDecks,
            'availableDecks'=>$availableDecks,
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



           /**
     * Add new Decks to the Group
     */
    public function addDeck(Request $request, Group $group)
    {
        $validated = $request->validate([
             'decks' => 'required|array', // Assuming 'decks' is an array of deck IDs
        ]);
    
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
            return back()->with('error', 'An error occurred while adding a new deck to the group.');
        }
    }



/**
 * Remove Deck from Group
 */
public function removeDeck($deckId)
{
    try {
         Deck::where('id', $deckId)->update(['group_id' => null]);

        return back()->with('success', 'Deck removed from group successfully.');
    } catch (ModelNotFoundException $e) {
        abort(404, 'Deck not found');
    } catch (\Exception $e) {
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