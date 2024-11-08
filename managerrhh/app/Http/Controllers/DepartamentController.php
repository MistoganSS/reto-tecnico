<?php

namespace App\Http\Controllers;

use App\Models\Departament;
use Illuminate\Http\Request;

class DepartamentController extends Controller
{
    public function index()
    {
        $departments = Departament::with('childDepartments')->get();
        return response()->json($departments);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'parent' => 'nullable|exists:departaments,id',
            'name' => 'required|string|max:45',
            'has_childs' => 'boolean',
        ]);

        $departament = Departament::create($validatedData);
        if ($departament->parent) {
            $this->updateParent($departament->parent);
        }
        return response()->json($departament, 201);
    }

    public function show($id)
    {
        $departament = Departament::with('childDepartments')->findOrFail($id);
        return response()->json($departament);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'parent' => 'nullable|exists:departaments,id',
            'name' => 'required|string|max:255',
            'has_childs' => 'boolean',
        ]);

        $departament = Departament::findOrFail($id);
        $departament->update($validatedData);

        if ($departament->parent) {
            $this->updateParent($departament->parent);
        }

        return response()->json($departament);
    }

    public function destroy($id)
    {
        $departament = Departament::findOrFail($id);
        $parentId = $departament->parent;
        $departament->delete();

        if ($parentId) {
            $this->updateParent($parentId);
        }

        return response()->json(['message' => 'Departamento eliminado correctamente.']);
    }

    public function updateParent($parentId)
    {
        $parentDepartament = Departament::findOrFail($parentId);

        $parentDepartament->has_childs = $parentDepartament->childDepartments()->count() > 0;
        $parentDepartament->save();
    }
}
