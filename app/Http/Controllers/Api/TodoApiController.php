<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoApiController extends Controller
{
    public function index()
    {
        $todos = Todo::latest()->get();

        return response()->json([
            'status' => 'success',
            'todos'  => $todos,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:10|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $todo = Todo::create([
            'title'       => $request->title,
            'description' => $request->description,
            'completed'   => 0,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Todo created successfully.',
            'todo'    => $todo
        ]);
    }

    public function show(Todo $todo)
    {
        return response()->json([
            'status' => 'success',
            'todo'   => $todo
        ]);
    }

    public function update(Request $request, Todo $todo)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:10|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $todo->update([
            'title'       => $request->title,
            'description' => $request->description
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Todo updated successfully.',
            'todo'    => $todo
        ]);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Success! Todo deleted successfully.'
        ]);
    }
}
