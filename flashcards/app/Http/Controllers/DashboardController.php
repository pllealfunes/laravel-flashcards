<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Deck;
use App\Models\Group;


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

        // Prepare the data array
        $data = [
            'decks' => $decks,
            'groups' => $groups,
            'successLogin' => session('success')
        ];

        // Render the Inertia view with the data
        return Inertia::render('Dashboard', $data);
    }
}