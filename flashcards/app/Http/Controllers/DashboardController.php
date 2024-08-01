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

        // Get decks ordered by created_at first, then by lastviewed
        $decks = Deck::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->orderByDesc('lastviewed')
            ->get();

        // Get groups ordered by created_at first, then by lastviewed
        $groups = Group::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->orderByDesc('lastviewed')
            ->get();

        // Merge and paginate
        $deckAndGroupItems = collect($decks->map(function ($deck) {
            return [
                'id' => $deck->id,
                'title' => $deck->title,
                'lastviewed' => $deck->lastviewed,
                'created_at' => $deck->created_at,
                'updated_at' => $deck->updated_at,
                'type' => 'deck'
            ];
        })->merge($groups->map(function ($group) {
            return [
                'id' => $group->id,
                'title' => $group->title,
                'lastviewed' => $group->lastviewed,
                'created_at' => $group->created_at,
                'updated_at' => $group->updated_at,
                'type' => 'group'
            ];
        })));

             // Sort by lastviewed and then by created_at
        $deckAndGroupItems = $deckAndGroupItems->sort(function ($a, $b) {
            if ($a['lastviewed'] == $b['lastviewed']) {
                return $b['created_at'] <=> $a['created_at'];
            }
            return $b['lastviewed'] <=> $a['lastviewed'];
        })->values();
        
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