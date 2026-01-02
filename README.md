# AJAX & Fetch API Laravel Todo CRUD

A modern Laravel **Todo Application** with **Authentication (Breeze)**, **AJAX/Fetch API**, **DataTables**, **Bootstrap UI**, **Event-Driven Notifications**, and **Real-Time-Like Notification UI**.

This project demonstrates creating a fully responsive CRUD application using Laravel with a frontend driven entirely by Fetch/AJAX, plus notifications for user actions — all in a realtime-style interface.

---

## 🚀 Features

### 🔐 Authentication
Built with **Laravel Breeze** (Blade stack):
- User registration and login
- Auth-protected routes
- Logout

### 🗒️ Todo Management (SPA-Like)
Todos are managed through Fetch API:
- Create
- View (read-only mode)
- Edit
- Delete (SweetAlert confirmation)
- DataTables integration (search, pagination, sorting)

### 🔔 Event-Driven Notifications
Notifications trigger on user actions:
- Todo Created
- Todo Updated
- Todo Deleted

Sent to:
- ✔️ Admin users
- ✔️ User who performed the action

Notifications are stored in the database and displayed via a UI bell icon.

### 🔔 Notifications UI
- Bell icon with unread badge
- Dropdown list of notifications
- Mark individual notification read
- Mark all notifications read
- Auto refresh every 15 seconds

---

## 📦 Tech Stack

| Feature / Technology | Usage |
|----------------------|-------|
| Laravel (10/11) | Backend |
| Breeze (Blade) | Auth UI |
| Fetch API / AJAX | API consuming frontend |
| DataTables | Table interaction |
| SweetAlert2 | UX alerts |
| Bootstrap 5 | Responsive UI |
| Laravel Events & Notifications | Notification system |

---

## 🧱 Installation

1. **Clone the Repo**
   ```bash
   git clone https://github.com/Sohailqureshi9/AJAX-FetchAPI-CRUD.git
   cd AJAX-FetchAPI-CRUD


Install PHP dependencies

composer install


Install NPM dependencies

npm install
npm run build


Configure Environment

cp .env.example .env
php artisan key:generate


Update .env with your database credentials.

Database Migrations

php artisan migrate


Install Breeze Authentication

composer require laravel/breeze --dev
php artisan breeze:install blade
npm install
npm run build


Make Admin User

Register a user

Set them as admin using Tinker:

php artisan tinker
$user = \App\Models\User::where('email','YOURADMINEMAIL')->first();
$user->is_admin = true;
$user->save();


Run

php artisan serve


Visit:

http://127.0.0.1:8000/login

🗂 Project Structure
app/
 ├── Events/
 │    ├── TodoCreated.php
 │    ├── TodoUpdated.php
 │    └── TodoDeleted.php
 │
 ├── Listeners/
 │    ├── SendTodoNotificationOnCreate.php
 │    ├── SendTodoNotificationOnUpdate.php
 │    └── SendTodoNotificationOnDelete.php
 │
 ├── Notifications/
 │    └── TodoActionNotification.php
 │
 ├── Http/
 │    ├── Controllers/
 │    │    ├── TodoController.php
 │    │    ├── Api/TodoApiController.php
 │    │    └── NotificationController.php
 │
resources/
 ├── views/
 │    ├── layouts/app.blade.php
 │    ├── todos/index.blade.php
 │    └── todos/subview/create.blade.php
 │
public/
 └── assets/js/script.js

📌 Routes Overview
Web
Method	URI	Purpose
GET	/todos	Todo UI
POST	/notifications/read-all	Mark all read
API (session auth)
Method	URI	Purpose
GET	/api/todos	Fetch all todos
POST	/api/todos	Create todo
GET	/api/todos/{id}	Fetch single
PUT	/api/todos/{id}	Update todo
DELETE	/api/todos/{id}	Delete todo
GET	/notifications/list	Fetch notifications
POST	/notifications/{id}/read	Mark one read
🔔 Notifications Flow

User Creates/Updates/Deletes Todo

Event triggered

Listener notifies:

Admins

The actor

Stored in notifications table

UI fetches and shows unread count & list

🧠 What You’ll Learn

Fullstack Laravel + Fetch API CRUD

Real-time style interactions

Event & Listener pattern

Database notifications

Auth with Breeze

UI/UX with DataTables & SweetAlert

📄 License

Open source — free to use for learning and projects.

👨‍💻 Author

Muhammad Sohail
Laravel Developer
GitHub: @Sohailqureshi9
