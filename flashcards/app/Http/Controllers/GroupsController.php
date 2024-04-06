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

class GroupsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $groups = Group::orderBy('created_at', 'DESC')->get();
        
        // return Inertia::render('Dashboard', ['groups' => $groups]);
    }

    /**
     * Show the form for creating a new resource.
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
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        $decks = Deck::where('group_id', $group->id)->get();

        return inertia('Groups/ViewGroup', [
            'group' => $group,
            'decks' => $decks,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

         /**
     * Update Deck Title
     */
    public function updateTitle(Request $request, Group $group)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);
    
        try {
            if ($group->user_id === $request->user()->id) {
                $group->title = $validated['title']; // Access 'title' from the validated array
                $group->save();
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
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Flashcard $flashcard)
    // {
    //     $validated = $request->validate([
    //         'question' => 'required|string|max:255',
    //         'answer' => 'required|string|max:255',
    //         'hint' => 'string|nullable|max:255',
    //         'difficulty' => 'required|in:easy,medium,hard',
    //         'points' => 'required|in:1,3,5',
    //     ]);

    //     try {
            
    //         // Ensure that the deck belongs to the authenticated user
    //         if ($flashcard->user_id === $request->user()->id) {
                
    //             // update flashcard
              
    //             $flashcard->question = $validated['question'];
    //             $flashcard->answer = $validated['answer'];
    //             $flashcard->hint = $validated['hint'];
    //             $flashcard->difficulty = $validated['difficulty'];
    //             $flashcard->points = $validated['points'];
                
               
    //           $flashcard->save();
    
    //             // If the deletion was successful and authorized, redirect to dashboard
    //              return back()->with('success', 'Successfully Updated Card.');
    //         } else {
    //             // Handle unauthorized deletion attempts with a 403 status code
    //             abort(403, 'Unauthorized');
    //         }
    //     } catch (ModelNotFoundException $e) {
    //         // Handle the case where the deck is not found with a 404 status code
    //         abort(404, 'Flashcard not found');
    //     } catch (\Exception $e) {
    //         // Handle other potential exceptions with a generic error message
    //         return back()->with('error', 'An error occurred while updating flashcard.');
    //     }
    // }

    /**
     * Remove the specified resource from storage.
      */
    // public function destroy(Request $request, Flashcard $flashcard)
    // {
    //     try {
    //         // Ensure that the deck belongs to the authenticated user
    //         if ($flashcard->user_id === $request->user()->id) {
    //             // Delete the deck
    //             $flashcard->delete();
    //             $flashcard->user()->dissociate();
    //             // If the deletion was successful and authorized, redirect to dashboard
    //             return back()->with('success', 'Successfully Deleted Card.');
    //         } else {
    //             // Handle unauthorized deletion attempts with a 403 status code
    //             abort(403, 'Unauthorized');
    //         }
    //     } catch (ModelNotFoundException $e) {
    //         // Handle the case where the deck is not found with a 404 status code
    //         abort(404, 'Deck not found');
    //     } catch (\Exception $e) {
    //         // Handle other potential exceptions with a generic error message
    //         return back()->with('error', 'An error occurred while deleting the deck.');
    //     }}
}