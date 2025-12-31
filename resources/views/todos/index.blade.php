@extends('layouts.app')

@section('content')
@include('todos.subview.create')

<div class="container py-5">
    <h2 class="text-center">Ajax CRUD 11 (API Based)</h2>

    <div class="row align-items-center">
        <div class="col-xl-6">
            <div id="response"></div>
        </div>
        <div class="col-xl-6 text-end">
            <a href="javascript:void(0)" id="create-todo-btn" class="btn btn-primary btn-sm">Create Todo</a>
        </div>
    </div>

    <div class="table-responsive pt-4">
        <table class="table table-striped" id="todo-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>
@endsection








{{-- @extends('layouts.app')

@section('content')
@include('todos.subview.create')

<div class="container py-5">
    <h2 class="text-center">Ajax CRUD 11</h2>
    <div class="row">
        <div class="col-xl-6">
            <div id="response"></div>
        </div>
        <div class="col-xl-6 text-end">
            <a href="javascript:void(0)" id="create-todo-btn" class="btn btn-primary sm">Create Todo</a>
        </div>
    </div>
    <div class="table-responsive pt-6">
        <table class="table table-striped" id="todo-table">
            <thead>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Action</th>
            </thead>

            <tbody>
                @forelse($todos as $todo)
                <tr id="{{'todo_' .$todo->id}}">
                    <td>{{$todo->id}}</td>
                    <td>{{$todo->title}}</td>
                    <td>{{$todo->description}}</td>
                    <td>{{$todo->completed ? 'Yes' : 'No'}}</td>
                    <td>
                        <a class="btn btn-info btn-sm btn-view" href="javascript:void(0)" data-id="{{$todo->id}}">View</a>
                        <a class="btn btn-success btn-sm btn-edit" href="javascript:void(0)" data-id="{{$todo->id}}">Edit</a>
                        <a class="btn btn-danger btn-sm btn-delete" href="javascript:void(0)" data-id="{{$todo->id}}">Delete</a>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="text-center; text-danger">No todo found</td>
                </tr>
                @endforelse
            </tbody>
        </table>

    </div>
</div>
@endsection --}}