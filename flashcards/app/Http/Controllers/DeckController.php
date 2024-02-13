<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Decks/Index', [

            'decks' => Deck::all()->latest()->get(),

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
    public function show(Deck $deck)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deck $deck)
    {
        //
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