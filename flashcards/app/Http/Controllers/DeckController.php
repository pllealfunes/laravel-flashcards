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

        return Inertia::render('Decks/DeckView', ['deck' => $deck, 'isUpdating' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deck $deck)
    {
        return redirect(route('dashboard'));
    }



        /**
     * Show the form for editing the specified resource.
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, Deck $deck)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deck $deck)
    {
        //
    }
}