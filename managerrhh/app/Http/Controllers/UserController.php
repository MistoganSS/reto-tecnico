<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('positions')->get();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::with('positions')->findOrFail($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'positions' => 'nullable|array',
            'positions.*' => 'exists:positions,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (isset($validated['positions'])) {
            $user->positions()->sync($validated['positions']);
        }

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:45',
            'email' => 'required|email|unique:users,email,' . $id,
            'positions' => 'nullable|array',
            'positions.*' => 'exists:positions,id',
        ]);

        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }


        $user->save();

        if (isset($validated['positions'])) {
            $user->positions()->sync($validated['positions']);
        }

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function assignPositions(Request $request, $userId)
    {
        $request->validate([
            'positions' => 'required|array',
            'positions.*' => 'exists:positions,id',
        ]);

        $user = User::findOrFail($userId);

        $user->positions()->sync($request->positions);

        return response()->json(['message' => 'Positions assigned successfully']);
    }

    public function removePositions(Request $request, $userId)
    {
        $request->validate([
            'positions' => 'required|array',
            'positions.*' => 'exists:positions,id',
        ]);

        $user = User::findOrFail($userId);

        $user->positions()->detach($request->positions);

        return response()->json(['message' => 'Positions removed successfully']);
    }
}
