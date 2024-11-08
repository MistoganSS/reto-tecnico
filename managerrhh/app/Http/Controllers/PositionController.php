<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Position::all();
        return response()->json($positions);
    }

    public function show($id)
    {
        $position = Position::findOrFail($id);
        return response()->json($position);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'departament_id' => 'required|exists:departaments,id',
            'name' => 'required|string|max:45',
            'work_modality' => 'required|in:on_site,hybrid,remote',
            'level' => 'required|in:junior,semi-senior,senior,gerencial',
            'order' => 'required|integer',
        ]);

        $position = Position::create($validated);
        return response()->json($position, 201);
    }
    public function storeMultiple(Request $request)
    {
        $validated = $request->validate([
            'positions' => 'required|array',
            'positions.*.departament_id' => 'required|exists:departaments,id',
            'positions.*.name' => 'required|string|max:45',
            'positions.*.work_modality' => 'required|in:on_site,hybrid,remote',
            'positions.*.level' =>  'required|in:junior,semi-senior,senior,gerencial',
        ]);

        $positions = collect($validated['positions'])->map(function ($position, $index) {
            $position['order'] = $index + 1;
            return $position;
        });

        $createdPositions = Position::insert($positions->toArray());

        return response()->json($createdPositions, 201);
    }

    public function update(Request $request, $id)
    {
        $position = Position::findOrFail($id);

        $validated = $request->validate([
            'departament_id' => 'required|exists:departaments,id',
            'name' => 'required|string|max:45',
            'work_modality' => 'required|in:on_site,hybrid,remote',
            'level' => 'required|in:junior,semi-senior,senior,gerencial',
            'order' => 'required|integer',
        ]);

        $position->update($validated);
        return response()->json($position);
    }

    public function destroy($id)
    {
        $position = Position::findOrFail($id);

        $position->delete();
        return response()->json(['message' => 'Position deleted successfully']);
    }
}
