# NestJS Todo API (Authentication + Authorization)

# Secure Todo API (NestJS + Prisma + JWT)

A secure REST API built using NestJS, Prisma, and PostgreSQL.

This project focuses on implementing backend security concepts like:

- JWT Authentication
- Refresh Tokens
- Password Hashing (bcrypt)
- Protected Routes (AuthGuard)
- User based Todo CRUD operations

---

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Passport
- Bcrypt
- Class Validator

---

## Features

User Authentication
- Register user
- Login user
- Password hashing
- Access Token (JWT)
- Refresh Token system

Todo System
- Create Todo
- Get All Todos (only user's todos)
- Get Todo By ID
- Update Todo
- Delete Todo

Security
- JWT Protected Routes
- Refresh Token validation
- DTO Validation using class-validator

---

## Installation

Clone the repository

git clone https://github.com/st7ven7/Todo-nestjs-backend

Go into the project

cd nestjs-todo-auth

Install dependencies

pnpm install

Setup environment variables

Create a `.env` file

DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
JWT_SECRET="supersecret"

Run Prisma migration

pnpm prisma migrate dev

Start server

pnpm start:dev

---

## API Endpoints

Auth

POST /auth/register  
POST /auth/login  
POST /auth/refresh

Todos

POST /todos  
GET /todos  
GET /todos/:id  
PATCH /todos/:id  
DELETE /todos/:id

---

## Author

Ayush Magar