$(document).ready(function () {

    $('#todo-form').on('submit', function (e) {
        e.preventDefault();
    });


    function modalToggle() {
        const modalEl = document.getElementById('todo-modal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.toggle();
    }

    function autoHideResponse() {
        setTimeout(function () {
            $('#response').fadeOut(300, function () {
                $(this).html('').show();
            });
        }, 2000);
    }


    const todoTable = $('#todo-table').DataTable();

    
    function rowHtml(todo) {
        return `
            <tr id="todo_${todo.id}">
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td>${todo.completed ? 'Yes' : 'No'}</td>
                <td>
                    <a class="btn btn-info btn-sm btn-view" href="javascript:void(0)" data-id="${todo.id}">View</a>
                    <a class="btn btn-success btn-sm btn-edit" href="javascript:void(0)" data-id="${todo.id}">Edit</a>
                    <a class="btn btn-danger btn-sm btn-delete" href="javascript:void(0)" data-id="${todo.id}">Delete</a>
                </td>
            </tr>
        `;
    }


    async function loadTodos() {
        try {
            const res = await fetch(`${apiBaseUrl}/todos`, {
                headers: { 'Accept': 'application/json' }
            });

            const data = await res.json();

            todoTable.clear();

            if (data.status === 'success' && Array.isArray(data.todos)) {
                data.todos.forEach(todo => {
                    todoTable.row.add($(rowHtml(todo)));
                });
                todoTable.draw(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    loadTodos();

    $('#create-todo-btn').click(function () {

        $('#todo-form')[0].reset();
        $('#todo-form').attr('data-mode', 'create');
        $('#todo-form').attr('data-id', '');

        $('#todo-form input, #todo-form textarea').prop('readonly', false);
        $('#save-btn').removeClass('d-none').prop('disabled', false);

        $('#modal-title').html('Create Todo');
        modalToggle();
    });


    $('#todo-form').validate({

        rules: {
            title: { required: true, minlength: 3, maxlength: 50 },
            description: { required: true, minlength: 10, maxlength: 255 }
        },

        messages: {
            title: {
                required: "Please enter a title",
                minlength: "Title must be at least 3 characters long",
                maxlength: "Title must be at most 50 characters long"
            },
            description: {
                required: "Please enter a description",
                minlength: "Description must be at least 10 characters long",
                maxlength: "Description must be at most 255 characters long"
            }
        },

        submitHandler: async function (form) {
            event.preventDefault();

            $("#response").empty();

            const mode = $('#todo-form').attr('data-mode'); 
            const todoId = $('#todo-form').attr('data-id');

           
            if (mode === 'view') return false;

            const payload = {
                title: $('#title').val(),
                description: $('#description').val()
            };

            let url = `${apiBaseUrl}/todos`;
            let method = "POST";

            if (mode === 'edit' && todoId) {
                url = `${apiBaseUrl}/todos/${todoId}`;
                method = "PUT";
            }

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();

                if (!res.ok) throw data;

            
                modalToggle();
                $('#todo-form')[0].reset();

               
                $("#response").html(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${data.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `);
                autoHideResponse();

                if (mode === 'edit' && todoId) {
                    $(`#todo_${todoId} td:nth-child(2)`).html(data.todo.title);
                    $(`#todo_${todoId} td:nth-child(3)`).html(data.todo.description);
                    $(`#todo_${todoId} td:nth-child(4)`).html(data.todo.completed ? 'Yes' : 'No');
                    todoTable.row($(`#todo_${todoId}`)).invalidate().draw(false);
                } else {
                    const addedRow = todoTable.row.add($(rowHtml(data.todo))).draw(false).node();
                    $(addedRow).attr('id', `todo_${data.todo.id}`);
                }

            } catch (err) {
                let msg = "Something went wrong.";
                if (err && err.message) msg = err.message;

                $("#response").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${msg}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `);
                autoHideResponse();
            }

            return false; 
        }
    });


    async function fetchTodo(todoId, mode) {
        try {
            const res = await fetch(`${apiBaseUrl}/todos/${todoId}`, {
                headers: { 'Accept': 'application/json' }
            });

            const data = await res.json();

            if (data.status !== 'success') return;

            const todo = data.todo;

            $('#title').val(todo.title);
            $('#description').val(todo.description);

            $('#todo-form').attr('data-id', todo.id);
            $('#todo-form').attr('data-mode', mode);

            if (mode === 'view') {
             
                $('#todo-form input, #todo-form textarea').prop('readonly', true);

               
                $('#save-btn').addClass('d-none').prop('disabled', true);

                $('#modal-title').html('Todo Details of: ' + todo.title);
            }

            if (mode === 'edit') {
               
                $('#todo-form input, #todo-form textarea').prop('readonly', false);

               
                $('#save-btn').removeClass('d-none').prop('disabled', false);

                $('#modal-title').html('Edit Todo: ' + todo.title);
            }

            modalToggle();

        } catch (e) {
            console.log(e);
        }
    }

  
    $('#todo-table').on('click', '.btn-view', function () {
        const todoId = $(this).data('id');
        if (todoId) fetchTodo(todoId, 'view');
    });

  
    $('#todo-table').on('click', '.btn-edit', function () {
        const todoId = $(this).data('id');
        if (todoId) fetchTodo(todoId, 'edit');
    });


    $('#todo-table').on('click', '.btn-delete', function () {
        const todoId = $(this).data('id');
        if (!todoId) return;

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                const res = await fetch(`${apiBaseUrl}/todos/${todoId}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                const data = await res.json();

                if (data.status === 'success') {
                    todoTable.row($(`#todo_${todoId}`)).remove().draw(false);
                    Swal.fire("Deleted!", data.message, "success");
                } else {
                    Swal.fire("Failed!", data.message || "Unable to delete Todo.", "error");
                }
            } catch (e) {
                Swal.fire("Failed!", "Unable to delete Todo.", "error");
            }
        });
    });

});


// $.ajaxSetup({
//     headers: {
//         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//     }
// });

// $(document).ready(function () {

//     // ===============================
//     // Bootstrap 5 Modal Handle
//     // ===============================
//     function modalToggle() {
//         const modalEl = document.getElementById('todo-modal');
//         const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
//         modal.toggle();
//     }

//     // ===============================
//     // Auto hide response message (2 sec)
//     // ===============================
//     function autoHideResponse() {
//         setTimeout(function () {
//             $('#response').fadeOut(300, function () {
//                 $(this).html('').show();
//             });
//         }, 2000);
//     }

//     // ===============================
//     // DataTable instance
//     // ===============================
//     const todoTable = $('#todo-table').DataTable();

//     // ===============================
//     // Create Todo
//     // ===============================
//     $('#create-todo-btn').click(function () {
//         $('#todo-modal #title').val('');
//         $('#todo-modal #description').val('');
//         $('#todo-form input, #todo-form textarea').removeAttr('readonly');
//         $('#todo-form button[type=submit]').removeClass("d-none");
//         $('#modal-title').html('Create Todo');
//         $('#todo-form').attr('action', `${baseUrl}/todos`);
//         $('#hidden-todo-id').remove();
//         modalToggle();
//     });

//     // ===============================
//     // Form Validation + Submit
//     // ===============================
//     $('#todo-form').validate({

//         rules: {
//             title: { required: true, minlength: 3, maxlength: 50 },
//             description: { required: true, minlength: 10, maxlength: 255 }
//         },

//         messages: {
//             title: {
//                 required: "Please enter a title",
//                 minlength: "Title must be at least 3 characters long",
//                 maxlength: "Title must be at most 50 characters long"
//             },
//             description: {
//                 required: "Please enter a description",
//                 minlength: "Description must be at least 10 characters long",
//                 maxlength: "Description must be at most 255 characters long"
//             }
//         },

//         submitHandler: function (form) {

//             $("#response").empty();

//             const todoId = $('#hidden-todo-id').val();
//             const formAction = $(form).attr('action');

//             let formData = $(form).serialize();
//             if (todoId) formData += "&_method=PUT";

//             $.ajax({
//                 url: formAction,
//                 type: "POST",
//                 data: formData,
//                 beforeSend: function () {
//                     console.log('Loading...');
//                 },
//                 success: function (response) {

//                     $('#todo-form')[0].reset();
//                     modalToggle();

//                     if (response.status === 'success') {

//                         $("#response").html(
//                             `<div class="alert alert-success alert-dismissible fade show" role="alert">
//                                 ${response.message}
//                                 <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
//                             </div>`
//                         );
//                         autoHideResponse();

//                         // UPDATE
//                         if (todoId) {

//                             $(`#todo_${todoId} td:nth-child(2)`).html(response.todo.title);
//                             $(`#todo_${todoId} td:nth-child(3)`).html(response.todo.description);
//                             $(`#todo_${todoId} td:nth-child(4)`).html(response.todo.completed ? 'Yes' : 'No');

//                             todoTable.row($(`#todo_${todoId}`)).invalidate().draw(false);

//                         } else {
//                             // CREATE
//                             const newRowHtml = `
//                                 <tr id="todo_${response.todo.id}">
//                                     <td>${response.todo.id}</td>
//                                     <td>${response.todo.title}</td>
//                                     <td>${response.todo.description}</td>
//                                     <td>${response.todo.completed ? 'Yes' : 'No'}</td>
//                                     <td>
//                                         <a class="btn btn-info btn-sm btn-view" href="javascript:void(0)" data-id="${response.todo.id}">View</a>
//                                         <a class="btn btn-success btn-sm btn-edit" href="javascript:void(0)" data-id="${response.todo.id}">Edit</a>
//                                         <a class="btn btn-danger btn-sm btn-delete" href="javascript:void(0)" data-id="${response.todo.id}">Delete</a>
//                                     </td>
//                                 </tr>
//                             `;

//                             const addedRow = todoTable.row.add($(newRowHtml)).draw(false).node();
//                             $(addedRow).attr('id', `todo_${response.todo.id}`);
//                         }
//                     }
//                 },
//                 error: function (error) {

//                     let msg = "Something went wrong.";
//                     if (error.responseJSON && error.responseJSON.message) {
//                         msg = error.responseJSON.message;
//                     }

//                     $("#response").html(
//                         `<div class="alert alert-danger alert-dismissible fade show" role="alert">
//                             ${msg}
//                             <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
//                         </div>`
//                     );
//                     autoHideResponse();
//                 }
//             });
//         }
//     });

//     // ===============================
//     // View Todo
//     // ===============================
//     $('#todo-table').on('click', '.btn-view', function () {
//         const todoId = $(this).data('id');
//         todoId && fetchTodo(todoId, "view");
//     });

//     // ===============================
//     // Edit Todo
//     // ===============================
//     $("#todo-table").on('click', '.btn-edit', function () {
//         const todoId = $(this).data('id');
//         todoId && fetchTodo(todoId, "edit");
//     });

//     // ===============================
//     // Delete Todo
//     // ===============================
//     $("#todo-table").on('click', '.btn-delete', function () {
//         const todoId = $(this).data('id');

//         if (todoId) {
//             Swal.fire({
//                 title: "Are you sure?",
//                 text: "Once deleted, you won't be able to revert this!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: "Yes, delete it!"
//             }).then((result) => {
//                 if (result.isConfirmed) {

//                     $.ajax({
//                         url: `${baseUrl}/todos/${todoId}`,
//                         type: "POST",
//                         data: { _method: "DELETE" },
//                         success: function (response) {

//                             if (response.status === 'success') {
//                                 todoTable.row($(`#todo_${todoId}`)).remove().draw(false);

//                                 Swal.fire("Deleted!", response.message, "success");
//                             } else {
//                                 Swal.fire("Failed!", response.message, "error");
//                             }
//                         },
//                         error: function () {
//                             Swal.fire("Failed!", "Unable to delete Todo.", "error");
//                         }
//                     });
//                 }
//             });
//         }
//     });

//     // ===============================
//     // Fetch Todo (View / Edit)
//     // ===============================
//     function fetchTodo(todoId, mode = null) {
//         if (todoId) {
//             $.ajax({
//                 url: `${baseUrl}/todos/${todoId}`,
//                 type: "GET",
//                 success: function (response) {

//                     if (response.status === 'success') {

//                         const todo = response.todo;

//                         $('#todo-modal #title').val(todo.title);
//                         $('#todo-modal #description').val(todo.description);
//                         $('#hidden-todo-id').remove();

//                         if (mode === "view") {
//                             $('#todo-form input, #todo-form textarea').attr('readonly', true);
//                             $('#todo-form button[type=submit]').addClass("d-none");
//                             $('#modal-title').html('Todo Details of: ' + todo.title);
//                             $('#todo-form').removeAttr('action');
//                         }
//                         else if (mode === "edit") {
//                             $('#todo-form input, #todo-form textarea').removeAttr('readonly');
//                             $('#todo-form button[type=submit]').removeClass("d-none");
//                             $('#modal-title').html('Edit Todo: ' + todo.title);
//                             $('#todo-form').attr('action', `${baseUrl}/todos/${todo.id}`);
//                             $('#todo-form').append(`<input type="hidden" id="hidden-todo-id" value="${todo.id}">`);
//                         }

//                         modalToggle();
//                     }
//                 },
//                 error: function (error) {
//                     console.log(error);
//                 }
//             });
//         }
//     }

// });
