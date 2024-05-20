# Quiz Application

## Overview

This project is a full-stack quiz application that allows users to take quizzes on various topics, track their scores, and view a leaderboard. The project is divided into two main parts:

- **Backend**: Handles user authentication, quiz management, and data storage.
- **Frontend**: Provides a user interface for taking quizzes, viewing results, and accessing the leaderboard.

## Architecture

The application follows a typical client-server architecture:

- **Frontend**: Built with React, communicates with the backend via REST APIs.
- **Backend**: Built with Node.js and Express, uses MongoDB for data storage.

## APIs

### User Authentication

- **POST /api/user/register**: Register a new user.
- **POST /api/user/login**: Login an existing user.

### Quiz Management

- **GET /api/quiz/get**: Get a list of quizzes.
- **POST /api/quiz/submit**: Submit quiz results.

### Leaderboard

- **GET /api/leaderboard/get**: Get leaderboard data.

## Running the Application Locally

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and configure your environment variables:
    ```env
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/quizApp
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    cd vite-project
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Add your backend your url in storecontext.jsx

4. Start the frontend server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register or login to your account.
3. Select a quiz topic and start the quiz.
4. Submit your answers and view your results.
5. Check the leaderboard to see how you compare with others.

