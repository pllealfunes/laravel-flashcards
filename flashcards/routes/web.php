<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\FlashcardsController;
use App\Http\Controllers\GroupsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Deck;
use App\Models\Group;
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
    $groups = Group::where('user_id', $user->id)->orderByDesc('lastviewed')->get();
     $data = [
        'decks' => $decks,
        'groups' => $groups,
        'successMessage' => "You're logged in!",
    ];
    return Inertia::render('Dashboard', $data);
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
    Route::get('/group/{group}', [GroupsController::class, 'show'])->name('group.show');
    Route::get('/createGroup', [GroupsController::class, 'create'])->name('group.create');
    Route::post('/createGroup', [GroupsController::class, 'store'])->name('group.store');
    Route::patch('/group/updateTitle/{group}', [GroupsController::class, 'updateTitle'])->name('group.updateTitle');
    Route::put('/group/addDeck/{group}', [GroupsController::class, 'addDeck'])->name('group.addDeck');
    Route::put('/group/removeDeck/{deck}', [GroupsController::class, 'removeDeck'])->name('group.removeDeck');
    Route::delete('/group/keepDecks/{group}', [GroupsController::class, 'keepDecks'])->name('group.keepDecks');
    Route::delete('/group/delete/{group}', [GroupsController::class, 'destroy'])->name('group.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';