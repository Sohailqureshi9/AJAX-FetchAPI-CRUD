<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index()
    {
        // $todos = Todo::all();
        // return view('todos.index', compact('todos'));
        return view('todos.index');
    }

    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'title' => 'required|min:3|max:50',
    //         'description' => 'required|min:10|max:255',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => $validator->errors()->first()
    //         ], 422);
    //     }

    //     $todo = Todo::create([
    //         'title' => $request->title,
    //         'description' => $request->description,
    //         'completed' => 0
    //     ]);

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Todo created successfully.',
    //         'todo' => $todo
    //     ]);
    // }

    // public function show(Todo $todo)
    // {
    //     return response()->json(['status' => 'success', 'todo' => $todo]);
    // }

    // public function update(Request $request, Todo $todo)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'title' => 'required|min:3|max:50',
    //         'description' => 'required|min:10|max:255',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => $validator->errors()->first()
    //         ], 422);
    //     }

    //     $todo->update([
    //         'title' => $request->title,
    //         'description' => $request->description
    //     ]);

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Todo updated successfully.',
    //         'todo' => $todo
    //     ]);
    // }

    // public function destroy(Todo $todo)
    // {
    //     if ($todo) {
    //         $todo->delete();

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Success! Todo deleted successfully.',
    //         ]);
    //     }
    //     return response()->json([
    //         'status' => 'error',
    //         'message' => 'Failed! Unable to delete Todo.',
    //     ]);
    // }
}
