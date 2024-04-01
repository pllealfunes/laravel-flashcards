<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\FlashcardsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Deck;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user(); 
    $decks = Deck::where('user_id', $user->id)->orderByDesc('lastviewed')->get();
    return Inertia::render('Dashboard')->with('decks', $decks);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/index', [DeckController::class, 'index'])->name('deck.index');
    Route::get('/createdeck', [DeckController::class, 'create'])->name('deck.create');
    Route::post('/createdeck', [DeckController::class, 'store'])->name('deck.store');
    Route::get('/deck/{deck}', [DeckController::class, 'show'])->name('deck.show');
    Route::delete('/deck/{deck}', [DeckController::class, 'destroy'])->name('deck.destroy');
    Route::get('/deck/updateDeck/{deck}', [DeckController::class, 'showUpdatePage'])->name('deck.showUpdatePage');
    Route::patch('/deck/updateTitle/{deck}', [DeckController::class, 'updateTitle'])->name('deck.updateTitle');
    
    Route::post('/deck/createFlashcard', [FlashcardsController::class, 'store'])->name('flashcard.store');
    Route::put('/deck/updateFlashcard/{flashcard}', [FlashcardsController::class, 'update'])->name('flashcard.update');
    Route::delete('/deck/deleteFlashcard/{flashcard}', [FlashcardsController::class, 'destroy'])->name('flashcard.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';