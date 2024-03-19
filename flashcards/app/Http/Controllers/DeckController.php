<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Decks/Index', [

            'decks' => Deck::get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Decks/CreateDeck', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([

            'title' => 'required|string|max:255',
            'cards'=> 'required|array|min:2',
            'cards.*.question' => 'required|string|max:255',
            'cards.*.answer' => 'required|string|max:255',
            'cards.*.hint' => 'required|string|max:255',
            'cards.*.difficultylevel' => 'required|string',
            'cards.*.points' => 'required|integer',
        ]);

 

        $request->user()->decks()->create($validated);

 

        return redirect(route('dashboard'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Deck $deck)
    {
        $validated = $request->validate([

            'lastviewed' => 'required|date',

        ]);

         // Parse the datetime string into Carbon instance
    $lastViewed = Carbon::parse($validated['lastviewed']);

    // Format Carbon instance to Laravel's default datetime format
    $formattedLastViewed = $lastViewed->toIso8601String();
    $deck->lastviewed = $formattedLastViewed;
    $deck->save();

        return Inertia::render('Decks/ViewDeck', ['deck' => $deck, 'isUpdating' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showUpdatePage(Deck $deck)
    {
        return Inertia::render('Decks/UpdateDeck',['deck' => $deck]);
    }



        /**
     * Update LastViewed of card.
     */
    public function lastviewed(Request $request, Deck $deck)
    {
        $ $validated = $request->validate([

            'lastviewed' => 'required|date',

        ]);

        $deck->update($validated);

    
        return response()->json(['message' => 'Last viewed updated successfully', 'lastViewed' => $deck->lastViewed]);
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
            $deck->title = $validated['title']; // Access 'title' from the validated array
            $deck->save();
         
            return back()->with('success', 'Deck title updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An error occurred while updating the deck title.']);
        }
    }


    /**
     * Update deck by deleting a card
     */
    public function updateDeleteCard(Request $request, Deck $deck)
    {
        $validated = $request->validate([
            'cards' => 'required|array|min:2',
        ]);
    
        try {
            $deck->cards = $validated['cards']; // Access 'title' from the validated array
            $deck->save();
            return back()->with('success', 'Deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An error occurred while deleting card.']);
        }
    }

     /**
     * Update a card in the deck
     */
    public function updateCard(Request $request, Deck $deck)
    {
        $validatedData = $request->validate([
            'card_id' => 'required',
            'question' => 'required|string',
            'answer' => 'required|string',
            'hint' => 'string|nullable',
            'difficultylevel' => 'string',
            'points' => 'integer',
        ]);
    
        $cardId = $validatedData['card_id'];
        $updatedCardData = [
            'question' => $validatedData['question'],
            'answer' => $validatedData['answer'],
            'hint' => $validatedData['hint'],
            'difficultylevel' => $validatedData['difficultylevel'],
            'points' => $validatedData['points'],
        ];
    
   // Find the index of the card in the deck's cards array by its ID
   $cardIndex = null;
   $cards = $deck->cards ?? [];
   foreach ($cards as $index => $card) {
       if ($card['id'] == $cardId) {
           $cardIndex = $index;
           break;
       }
   }

   if ($cardIndex !== null) {
       // Update the card in the cards array
       $cards[$cardIndex] = array_merge($cards[$cardIndex], $updatedCardData);
       $deck->cards = $cards; // Update the cards array in the deck
       $deck->save();

       return Inertia::location(route('deck.showUpdatePage', ['deck' => $deck->id]));
} else {
   // Redirect back with an error message if the card was not found
   return back()->withErrors(['error' => 'An error occurred while updating the card.']);
}
}

    /**
     * Delete Deck from database
     */
    public function destroy(Request $request, Deck $deck): RedirectResponse
    {
         // Ensure that the deck belongs to the authenticated user
    if ($deck->user_id === $request->user()->id) {
        // Delete the deck
        $deck->delete();
    } else {
        // Handle unauthorized deletion attempts (e.g., return an error response)
        abort(403, 'Unauthorized');
    }

        return redirect(route('dashboard'));
    }
}