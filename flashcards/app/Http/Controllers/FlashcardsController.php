<?php

namespace App\Http\Controllers;

use App\Models\Flashcard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;

class FlashcardsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
                $validated = $request->validate([
                    'deck_id'=> 'required',
                    'question' => 'required|string|max:255',
                    'answer' => 'required|string|max:255',
                    'hint' => 'string|nullable|max:255',
                    'difficulty' => 'required|in:easy,medium,hard',
                    'points' => 'required|in:1,3,5',
                ]);
              
                    
            $flashcard = new Flashcard();
            $flashcard->deck_id = $validated['deck_id'];
            $flashcard->user_id = $request->user()->id;
            $flashcard->question = $validated['question'];
            $flashcard->answer = $validated['answer'];
            $flashcard->hint = $validated['hint'];
            $flashcard->difficulty = $validated['difficulty'];
            $flashcard->points = $validated['points'];
            
           
          $flashcard->save();
        
                return back()->with('success', 'Successfully created a new card.');
            
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Flashcard $flashcard)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
            'hint' => 'string|nullable|max:255',
            'difficulty' => 'required|in:easy,medium,hard',
            'points' => 'required|in:1,3,5',
        ]);

        try {
            
            // Ensure that the deck belongs to the authenticated user
            if ($flashcard->user_id === $request->user()->id) {
                
                // update flashcard
              
                $flashcard->question = $validated['question'];
                $flashcard->answer = $validated['answer'];
                $flashcard->hint = $validated['hint'];
                $flashcard->difficulty = $validated['difficulty'];
                $flashcard->points = $validated['points'];
                
               
              $flashcard->save();
    
                // If the deletion was successful and authorized, redirect to dashboard
                 return back()->with('success', 'Successfully Updated Card.');
            } else {
                // Handle unauthorized deletion attempts with a 403 status code
                abort(403, 'Unauthorized');
            }
        } catch (ModelNotFoundException $e) {
            // Handle the case where the deck is not found with a 404 status code
            abort(404, 'Flashcard not found');
        } catch (\Exception $e) {
            // Handle other potential exceptions with a generic error message
            return back()->with('error', 'An error occurred while updating flashcard.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Flashcard $flashcard)
    {
        try {
            // Ensure that the deck belongs to the authenticated user
            if ($flashcard->user_id === $request->user()->id) {
                // Delete the deck
                $flashcard->delete();
                $flashcard->user()->dissociate();
                // If the deletion was successful and authorized, redirect to dashboard
                return back()->with('success', 'Successfully Deleted Card.');
            } else {
                // Handle unauthorized deletion attempts with a 403 status code
                abort(403, 'Unauthorized');
            }
        } catch (ModelNotFoundException $e) {
            // Handle the case where the deck is not found with a 404 status code
            abort(404, 'Deck not found');
        } catch (\Exception $e) {
            // Handle other potential exceptions with a generic error message
            return back()->with('error', 'An error occurred while deleting the deck.');
        }}
}