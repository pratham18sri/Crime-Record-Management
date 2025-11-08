# Crime Record Management

**Folder Structure**

*   **index.js** (Entry point)
*   **Config/**
    *   **db.js** (Database configuration)
*   **Routes/**
    *   **auth.routes.js** (Authentication routes)
    *   **crime.routes.js** (Crime related routes)
*   **Backend/uploads/** (Static folder for file uploads)

**Description**

A backend application for managing crime records. It provides API endpoints for authentication and managing crime-related data.

**How to Use**

1.  **Installation:**

    ```bash
    npm install
    ```

2.  **Configuration:**

    *   Create a `.env` file in the root directory.
    *   Set environment variables: `PORT`, `MONGO_URI`.

3.  **Run the application:**

    ```bash
    npm start
    ```

    The server will start on the port specified in your `.env` file (defaults to 8000).

**Technologies Used**

*   Node.js
*   Express.js
*   dotenv
*   Mongoose (Implied)
*   cookie-parser
*   cors

**Architecture or Code Overview**

*   **index.js**:
    *   Initializes Express application.
    *   Loads environment variables using `dotenv`.
    *   Connects to the database using `connectdb()`.
    *   Sets up middleware: `express.json()`, `cookieparser()`, `cors()`.
    *   Defines routes: Authentication (`/api`), Crime management (`/api/crime`).
    *   Serves static files for uploaded evidence.
    *   Starts the server.
*   **Routes**: Defines API endpoints for authentication and crime-related operations (CRUD).
*   **Config/db.js**: Handles database connection.

**Known Issues / Improvements**

*   Implement proper error handling and logging.
*   Add input validation for all API endpoints.
*   Implement user authentication and authorization.
*   Add documentation for the API (Swagger/OpenAPI).
*   Add tests.

**Additional Notes or References**

*   This project is configured to allow CORS requests from `https://crime-record-management-4.onrender.com`.