<?php

namespace App\Http\Controllers;

use App\Models\Deck;
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
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'cards' => 'required|array|min:2',
                'cards.*.question' => 'required|string|max:255',
                'cards.*.answer' => 'required|string|max:255',
                'cards.*.hint' => 'required|string|max:255',
                'cards.*.difficultylevel' => 'required|string',
                'cards.*.points' => 'required|integer',
            ]);
    
            $request->user()->decks()->create($validated);
    
            return redirect(route('dashboard'))->with('success', 'Successfully Created Deck.');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred while saving the deck.');
        }
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
     * Store a newly created resource in storage.
     */
    public function addCard(Request $request, Deck $deck)
    {

        try {
            if ($deck->user_id === $request->user()->id) {
              
                $validated = $request->validate([
                    'question' => 'required|string',
                    'answer' => 'required|string',
                    'hint' => 'string|nullable',
                    'difficultylevel' => 'string',
                    'points' => 'integer',
                ]);
            
                $deck->cards()->create($validated);

                return back()->with('success', 'Added card successfully.');
            } 
            else {
                // Handle unauthorized deletion attempts with a 403 status code
                abort(403, 'Unauthorized');
            }
        }  
        catch (ModelNotFoundException $e) {
            // Handle the case where the deck is not found with a 404 status code
            abort(404, 'Deck not found');
        }catch (\Exception $e) {
            return back()->with('error', $e);
        }
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
            return back()->with('error','An error occurred while updating the deck title.');
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
    try{
         // Update the card in the cards array
       $cards[$cardIndex] = array_merge($cards[$cardIndex], $updatedCardData);
       $deck->cards = $cards; // Update the cards array in the deck
       $deck->save();

       return back()->with('success', 'Successfully Updated Card.');
    } catch (\Exception $e) {
        return back()->with('error','An error occurred while updating the card.');
    }
} else {
   // Redirect back with an error message if the card was not found
   return back()->with('error','An error occurred while updating the card.');
}
}




   /**
     * Delete a card
     */
    public function deleteCard(Request $request, Deck $deck)
    {
        $validated = $request->validate([
            'cards' => 'required|array|min:2',
        ]);
    try {
        if ($deck->user_id === $request->user()->id) {
          
            $deck->cards = $validated['cards'];
            $deck->save();
            
            return back()->with('success', 'Deleted successfully.');
        } 
        else {
            // Handle unauthorized deletion attempts with a 403 status code
            abort(403, 'Unauthorized');
        }
    }  
    catch (ModelNotFoundException $e) {
        // Handle the case where the deck is not found with a 404 status code
        abort(404, 'Card not found');
    }catch (\Exception $e) {
        return back()->with('error', 'An error occurred while deleting the card.');
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
    
                // If the deletion was successful and authorized, redirect to dashboard
                return redirect(route('dashboard'))->with('success', 'Successfully Deleted Card.');
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