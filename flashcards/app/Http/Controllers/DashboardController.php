<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Deck;
use App\Models\Group;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;


class DashboardController extends Controller
{
  public function index()
{
    $user = Auth::user(); 

    // Get decks with group_id set to null
    $decks = collect(Deck::where('user_id', $user->id)
        ->whereNull('group_id')
        ->orderByDesc('created_at')
        ->orderByDesc('lastviewed')
        ->get()
        ->map(function ($deck) {
            return [
                'id' => $deck->id,
                'title' => $deck->title,
                'lastviewed' => $deck->lastviewed,
                'created_at' => $deck->created_at,
                'updated_at' => $deck->updated_at,
                'type' => 'deck'
            ];
        }));

    // Get groups
    $groups = collect(Group::where('user_id', $user->id)
        ->orderByDesc('created_at')
        ->orderByDesc('lastviewed')
        ->get()
        ->map(function ($group) {
            return [
                'id' => $group->id,
                'title' => $group->title,
                'lastviewed' => $group->lastviewed,
                'created_at' => $group->created_at,
                'updated_at' => $group->updated_at,
                'type' => 'group'
            ];
        }));

    // Merge and sort
    $deckAndGroupItems = $decks->merge($groups);

    $deckAndGroupItems = $deckAndGroupItems->sort(function ($a, $b) {
        if ($a['lastviewed'] == $b['lastviewed']) {
            return $b['created_at'] <=> $a['created_at'];
        }
        return $b['lastviewed'] <=> $a['lastviewed'];
    })->values();
    
    // Pagination
    $page = Paginator::resolveCurrentPage('page');
    $perPage = 10;
    $paginatedDeckAndGroupItems = new LengthAwarePaginator(
        $deckAndGroupItems->forPage($page, $perPage),
        $deckAndGroupItems->count(),
        $perPage,
        $page,
        ['path' => Paginator::resolveCurrentPath()]
    );

    // Prepare the data array
    $data = [
        'deckGroupItems' => $paginatedDeckAndGroupItems,
        'successLogin' => session('success')
    ];

    // Render the Inertia view with the data
    return Inertia::render('Dashboard', $data);
}
}