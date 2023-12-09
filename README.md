# Book Library

This is a simple web application implementing CRUD operations. It was created as a project for the Web Programming Practicum at LabTI Universitas Gunadarma.

## Prerequisites

- [XAMPP](https://www.apachefriends.org/index.html)
- [Node.js](https://nodejs.org/)

## Getting Started

1. Start XAMPP and activate MySQL.
2. Open the XAMPP Shell and run the following commands:

   ```sh
   mysql -u root
   ```
   ```sql
   create database db_ujian_pweb; -- or your designated database name
   use db_ujian_pweb;
    
   CREATE TABLE books (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     genre VARCHAR(255)
   );
   ```
3. Run the backend (server.js) with the following command in the project's home directory:
   ```bash
   npm start
   ```
5. Install dependencies and run the frontend in the frontend directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
Now, you should be able to access the project locally at [http://localhost:5137](http://localhost:5137) by default.
