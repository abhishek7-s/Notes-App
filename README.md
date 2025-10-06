# Full-Stack Notes Application

This is a full-stack notes application built for a backend developer internship assignment. It allows users to register, log in, and perform complete CRUD (Create, Read, Update, Delete) operations on their notes. The application features a secure NestJS backend and a responsive Next.js frontend.

## Live Demo & Video

* **Live Application:** [**https://setnotes.vercel.app/**](https://setnotes.vercel.app/)
* **Demo Video:** [**Watch on YouTube**](https://youtu.be/15n3Vd1tAJc)



## Features

* ✅ **User Authentication**: Secure user registration and login using Firebase Authentication (Email & Password).
* ✅ **JWT Protection**: Backend routes are protected using JSON Web Tokens provided by Firebase.
* ✅ **Full CRUD for Notes**: Users can create, view, update, and delete their own notes.
* ✅ **Ownership Security**: Users can only view, edit, or delete notes that they have created.
* ✅ **Responsive UI**: A clean, modern, and responsive user interface built with Next.js and Tailwind CSS.
* ✅ **Reusable Components**: The frontend is built with reusable components, including a single modal for both creating and editing notes.

## Tech Stack

* **Backend**:
    * [**NestJS**](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
    * [**TypeScript**](https://www.typescriptlang.org/) - Superset of JavaScript for strong typing.
    * [**Firebase Admin SDK**](https://firebase.google.com/docs/admin/setup) - For backend authentication and database operations.
* **Frontend**:
    * [**Next.js**](https://nextjs.org/) - A React framework for production.
    * [**React**](https://reactjs.org/) - A JavaScript library for building user interfaces.
    * [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
    * [**Firebase Client SDK**](https://firebase.google.com/docs/web/setup) - For client-side authentication.
    * [**Axios**](https://axios-http.com/) - For making HTTP requests to the backend.
* **Database & Services**:
    * [**Firebase Authentication**](https://firebase.google.com/docs/auth) - For handling user identity.
    * [**Firestore**](https://firebase.google.com/docs/firestore) - A NoSQL document database for storing user and notes data.
* **Deployment**:
    * **Backend**: [**Render**](https://render.com/)
    * **Frontend**: [**Vercel**](https://vercel.com/)

---

## Getting Started: Local Setup

Follow these instructions to get the project running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A [Firebase](https://firebase.google.com/) project with **Authentication** (Email/Password enabled) and **Firestore** enabled.

### 1. Backend Setup (`/backend`)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abhishek7-s/Notes-App
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    * Create a `.env` file in the `/backend` directory.
    * You will need to generate a **private key** for your Firebase service account. Go to **Project Settings > Service accounts** in your Firebase console and click "Generate new private key".
    * Copy the contents from the downloaded JSON file into your `.env` file as shown below:
    ```env
    # /backend/.env
    FIREBASE_PROJECT_ID="your-project-id"
    FIREBASE_CLIENT_EMAIL="your-client-email"
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
    ```
4.  **Run the development server:**
    ```bash
    npm run start:dev
    ```
    The backend will be running on `http://localhost:3000`.

### 2. Frontend Setup (`/frontend`)

1.  **Navigate to the frontend directory:**
    ```bash
    # From the root directory
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    * Create a `.env.local` file in the `/frontend` directory.
    * You will need your Firebase **web app configuration**. Go to **Project Settings > General** in your Firebase console, scroll down to "Your apps", and copy the `firebaseConfig` object.
    * Add the values to your `.env.local` file:
    ```env
    # /frontend/.env.local
    NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
    NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
    
    # URL of your backend
    NEXT_PUBLIC_BACKEND_API="http://localhost:3001/api"
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:3001`.

---

##  API Endpoints

All notes-related endpoints are protected and require a valid Bearer Token.

| Method   | Endpoint             | Protected | Description                        |
| :------- | :------------------- | :-------- | :--------------------------------- |
| `POST`   | `/api/auth/register` | No        | Registers a new user.              |
| `POST`   | `/api/auth/login`    | Yes       | Fetches user profile data.         |
| `POST`   | `/api/notes`         | Yes       | Creates a new note.                |
| `GET`    | `/api/notes`         | Yes       | Gets all notes for the logged-in user. |
| `PATCH`  | `/api/notes/:id`     | Yes       | Updates a specific note.           |
| `DELETE` | `/api/notes/:id`     | Yes       | Deletes a specific note.           |
