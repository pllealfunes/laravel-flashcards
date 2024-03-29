<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DeckController;
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
    Route::put('/deck/updateCard/{deck}', [DeckController::class, 'updateCard'])->name('deck.updateCard');
    Route::put('/deck/addCard/{deck}', [DeckController::class, 'addCard'])->name('deck.addCard');
    Route::patch('/deck/editTitle/{deck}', [DeckController::class, 'updateTitle'])->name('deck.updateTitle');
    Route::patch('/deck/deleteCard/{deck}', [DeckController::class, 'updateDeleteCard'])->name('deck.deleteCard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';