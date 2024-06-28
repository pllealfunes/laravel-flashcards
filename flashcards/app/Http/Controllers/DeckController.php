<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use App\Models\Flashcard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $decks = Deck::orderBy('created_at', 'DESC')->get();
        
        // return Inertia::render('Dashboard', ['decks' => $decks]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Decks/CreateDeck');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'flashcards' => 'required|array|min:2',
                'flashcards.*.question' => 'required|string|max:255',
                'flashcards.*.answer' => 'required|string|max:255',
                'flashcards.*.hint' => 'nullable|string|max:255',
                'flashcards.*.difficulty' => 'required|in:easy,medium,hard',
                'flashcards.*.points' => 'required|in:1,3,5',
            ], [
                'title.required' => 'A title is required to create a deck.',
                'flashcards.size' => 'A deck must contain a minimum of 2 flashcards',
                'flashcards.required' => 'A deck must contain a minimum of 2 flashcards',
                'flashcards.*.question.required' => 'The question field is required for all flashcards.',
                'flashcards.*.answer.required' => 'The answer field is required for all flashcards.',
                'flashcards.*.difficulty.required' => 'The difficulty level field is required for all flashcards.',
                'flashcards.*.points.required' => 'The points field is required for all flashcards.',
            ]);
    
              // Create the deck
    $deck = Deck::create([
        'title' => $validated['title'],
        'user_id' => $request->user()->id
    ]);

    // Create flashcards associated with the deck
    foreach ($validated['flashcards'] as $flashcardData) {
       Flashcard::create([
            'question' => $flashcardData['question'],
            'answer' => $flashcardData['answer'],
            'hint' => $flashcardData['hint'],
            'difficulty' => $flashcardData['difficulty'],
            'points' => $flashcardData['points'],
            'deck_id' => $deck->id,
            'user_id' => $deck->user_id ?? $request->user()->id
        ]);
    }
 
    
            return redirect(route('dashboard'))->with('success', 'Successfully Created Deck.');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Deck $deck)
    {

    // Format Carbon instance to Laravel's default datetime format
    $lastViewed = Carbon::now() -> toIso8601String();
    $deck->lastviewed = $lastViewed;
    $deck->save();

    $flashcards = Flashcard::where('deck_id', $deck->id)->get();

        return Inertia::render('Decks/ViewDeck', ['deck' => $deck, 'flashcards' => $flashcards, 'isUpdating' => true]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function showUpdatePage(Deck $deck)
    {
        $flashcards = Flashcard::where('deck_id', $deck->id)->get();
        return Inertia::render('Decks/UpdateDeck',['deck' => $deck, 'flashcards' => $flashcards]);
    }




      /**
     * Update Deck Title
     */
    public function updateTitle(Request $request, Deck $deck)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);
    
        try {
            if ($deck->user_id === $request->user()->id) {
                $deck->title = $validated['title']; // Access 'title' from the validated array
                $deck->save();
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
     * Delete Deck from database
     */
    public function destroy(Request $request, Deck $deck): RedirectResponse
    {
        try {
            // Ensure that the deck belongs to the authenticated user
            if ($deck->user_id === $request->user()->id) {
                // Delete the deck
                $deck->delete();
                $deck->user()->dissociate();
                // If the deletion was successful and authorized, redirect to dashboard
                return redirect(route('dashboard'))->with('success', 'Successfully Deleted Deck.');
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



         /**
     * GET the Quiz Page
     */

        public function quiz(Deck $deck){
             $flashcards = Flashcard::where('deck_id', $deck->id)->get();
             return Inertia::render('Quiz/Quiz', ['deck' => $deck, 'flashcards' => $flashcards]);
        }



         /**
     * GET the Memory Game Page
     */

        public function memoryGame(Deck $deck){
             $flashcards = Flashcard::where('deck_id', $deck->id)->get();
             return Inertia::render('MemoryGame/MemoryGame', ['deck' => $deck, 'flashcards' => $flashcards]);
        }
}