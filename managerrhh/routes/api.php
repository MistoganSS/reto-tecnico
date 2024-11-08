<?php

use App\Http\Controllers\DepartamentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/departaments',DepartamentController::class);

Route::post('/positions/multiple', [PositionController::class, 'storeMultiple']);
Route::apiResource('/positions',PositionController::class);

Route::post('/users/{id}/assign-positions', [UserController::class, 'assignPositions']);
Route::post('/users/{id}/remove-positions', [UserController::class, 'removePositions']);
Route::apiResource('/users',UserController::class);
