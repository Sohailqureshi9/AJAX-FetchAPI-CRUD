
# AJAX CRUD Todo Application (Laravel)

A modern **AJAX-based CRUD Todo application** built with **Laravel**, **jQuery**, **Bootstrap 5**, and **DataTables**.  
The project demonstrates real-time Create, Read, Update, and Delete operations using modals, client-side validation, and instant UI updates without page refresh.

---

## 🚀 Features

- Create, view, edit, and delete todos using AJAX
- Bootstrap 5 modal for form handling
- jQuery Validation for client-side validation
- SweetAlert confirmation for delete action
- DataTables integration (search, pagination, sorting)
- Instant UI updates (no page reload)
- Auto-hide success/error messages
- CSRF protection (Laravel default)

---

## 🛠️ Tech Stack

- **Backend:** Laravel (PHP)
- **Frontend:** jQuery, AJAX
- **UI:** Bootstrap 5
- **Table Handling:** DataTables
- **Alerts:** SweetAlert2
- **Validation:** jQuery Validate

---

## 📂 Project Structure



app/
└── Http/Controllers/TodoController.php

resources/
└── views/
└── todos/
├── index.blade.php
└── subview/create.blade.php

public/
└── assets/js/script.js

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Sohailqureshi9/AJAX-FetchAPI-CRUD

2️⃣ Install Dependencies
composer install
npm install

3️⃣ Environment Setup
cp .env.example .env
php artisan key:generate


Update database credentials in .env.

4️⃣ Run Migrations
php artisan migrate

5️⃣ Serve the Application
php artisan serve


Visit: http://127.0.0.1:8000

🔁 CRUD Workflow (AJAX)

Create: Opens modal → submits via AJAX → row added instantly

Read: Fetches todo via AJAX → opens modal in view mode

Update: Edits via modal → updates row instantly

Delete: SweetAlert confirmation → removes row instantly

🧠 Key Concepts Used

AJAX form submission

Laravel RESTful resource routes

Method spoofing (_method=PUT, _method=DELETE)

DataTable API (row.add(), row.remove(), invalidate())

Bootstrap 5 modal handling (JavaScript API)

✅ Best Practices Implemented

Separation of concerns (Controller, View, JS)

No page reloads

Proper CSRF handling

User-friendly alerts and validations

Clean and readable code structure

📌 Future Improvements

Server-side DataTables

Todo completion toggle

Authentication (Laravel Breeze)

Role-based access (Admin/User)

API version

👨‍💻 Author

Muhammad Sohail
Laravel Developer & QA Engineer
GitHub: https://github.com/Sohailqureshi9

📄 License

This project is open-source and free to use for learning and educational purposes.


If you want, I can also:
- ✨ Make **README more concise**
- 📸 Add **screenshots section**
- 🏷️ Write **LinkedIn post** for this project
- 🧪 Add **API documentation**
- 🔐 Add **Laravel Breeze authentication**

Just tell me 👍
