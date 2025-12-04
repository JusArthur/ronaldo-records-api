# Ronaldo Recprds API (v1.0.0)

    

A comprehensive RESTful API built with **Express.js**, **TypeScript**, and **Firebase Firestore** designed to manage Ronaldo's career data. This application facilitates the management of **Matches**, **Clubs**, and **Awards** with secure API design, robust validation, and automated testing.
RONALDO IS THE GOAT!
## Table of Contents

  - [Features](https://www.google.com/search?q=%23-features)
  - [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
  - [Prerequisites](https://www.google.com/search?q=%23-prerequisites)
  - [Installation & Setup](https://www.google.com/search?q=%23-installation--setup)
  - [Configuration](https://www.google.com/search?q=%23-configuration)
  - [Running the API](https://www.google.com/search?q=%23-running-the-api)
  - [API Documentation](https://www.google.com/search?q=%23-api-documentation)
  - [API Request Examples](https://www.google.com/search?q=%23-api-request-examples)
  - [Security](https://www.google.com/search?q=%23-security)
  - [Testing](https://www.google.com/search?q=%23-testing)

-----

## Features

  * **Match Management**: CRUD endpoints for match statistics (opponents, goals, assists).
  * **Club Management**: Track club history, seasons played, and stats.
  * **Award Management**: Manage player awards and recognition years.
  * **Security**: Implements Role-Based Access Control (RBAC) via `authenticate` and `isAuthorized` middleware.
  * **Validation**: strict Request validation using **Joi**.
  * **Documentation**: Interactive API exploration using **Swagger UI**.
  * **Database**: Cloud-native data storage using **Firebase Firestore**.
  * **Testing**: Comprehensive unit and integration testing using **Jest** and **Supertest**.

-----

## Tech Stack

  * **Runtime**: Node.js
  * **Language**: TypeScript
  * **Framework**: Express.js
  * **Database**: Firebase Firestore
  * **Validation**: Joi
  * **Documentation**: Swagger (OpenAPI 3.0)
  * **Testing**: Jest

-----

## Prerequisites

Before you begin, ensure you have the following installed:

  * [Node.js](https://nodejs.org/) (v16 or higher)
  * [npm](https://www.npmjs.com/)
  * A Firebase Project with Firestore enabled.

-----

## Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/football-data-api.git
    cd football-data-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Build the project:**

    ```bash
    npm run build
    ```

-----

## Configuration

Create a `.env` file in the root directory. You can copy the structure from `.env.example`:

```env
PORT=3000
NODE_ENV=development

# Firebase Configuration (JSON stringified)
FIREBASE_CONFIG={"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}

# Admin/User Token Secrets (if applicable)
JWT_SECRET=your_jwt_secret_key
```

-----

## Running the API

**Development Mode (with hot-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will start at `http://localhost:3000` (or your defined PORT).

-----

## API Documentation

This API is fully documented using OpenAPI (Swagger).

### Local Documentation Access

When the server is running locally, you can access the interactive Swagger UI at:

> **[http://localhost:3000/api-docs](https://www.google.com/search?q=http://localhost:3000/api-docs)**

### Public Documentation

(If you have deployed this, paste the link here. If not, remove this line)

> **[View Live API Documentation](https://jusarthur.github.io/ronaldo-records-api/)**

-----

## API Request Examples

Below are examples of how to interact with the core resources using `curl`. Note that write operations (POST, PUT, DELETE) require an Authorization header.

### 1\. Matches

**Get All Matches**

```bash
curl -X GET http://localhost:3000/api/v1/matches \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

**Create a Match**

```bash
curl -X POST http://localhost:3000/api/v1/matches \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "opponent": "Barcelona",
    "date": "2024-05-20",
    "goals": 2,
    "assists": 1
  }'
```

### 2\. Clubs

**Update a Club (PUT)**

```bash
curl -X PUT http://localhost:3000/api/v1/clubs/<CLUB_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "name": "Real Madrid",
    "seasons": "2009-2018",
    "goals": 451,
    "assists": 131
  }'
```

### 3\. Awards

**Get Award By ID**

```bash
curl -X GET http://localhost:3000/api/v1/awards/<AWARD_ID> \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

-----

## Testing

This project uses **Jest** for unit testing and **Supertest** for integration testing.

**Run All Tests:**

```bash
npm test
```

**Run Tests with Coverage:**

```bash
npm test -- --coverage
```