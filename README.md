# PayTM_MERN_Stack

## Overview

This is a full-stack Paytm-like application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to sign up, sign in, and send money to their friends.

## Features

- User authentication (sign up, sign in, logout)
- Wallet functionality for users
- Send money to friends
- Transaction history

## Tech Stack

- **Frontend:**
  - React.js
  - React Router for navigation
  - Axios for API requests
  - Tailwind css

- **Backend:**
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose for MongoDB object modeling
  - JWT for authentication

## Setup

  **Clone the Repository:**
   ```bash
   git clone https://github.com/Mayur-Shiwal/PayTM_MERN_Stack.git
   cd PayTM_MERN_Stack
```
**Install backend dependencies**
```
cd backend
npm install
``` 
**Install frontend dependencies**
```
cd ../frontend
npm install
```
**Configure Environment Variable:**
   Create a .env file in the server directory and configure the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
  ```
**Run the application:**
   **Run the server (in the server directory)**
  ```
  cd backend
  npm start
  ```
  **Run the client (in the client directory)**
  ```
  cd ../frontend
  npm start
  ```
**Access the Application:**
- Open your browser and go to http://localhost:3000 to access the Paytm application.

## Contributing:
- Feel free to contribute to the project. You can contribute by opening issues, submitting pull requests, or suggesting new features.



