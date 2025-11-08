# Crime Record Management System

## Folder Structure

```
├── Backend/
│   ├── Config/
│   │   └── db.js
│   ├── Controllers/
│   │   ├── auth.controller.js
│   │   └── crime.controller.js
│   ├── Models/
│   │   ├── crime.model.js
│   │   └── user.model.js
│   ├── Routes/
│   │   ├── auth.routes.js
│   │   └── crime.routes.js
│   ├── index.js
│   └── uploads/
│
├── Frontend/
│   ├── (client application files)
│
├── .env
├── package.json
├── README.md
└── (other configuration files)
```

## Description

This project is a Crime Record Management System. The backend is built using Node.js and Express.js and provides API endpoints for user authentication, crime record management, and storage of evidence files.

## How to Use

1.  **Prerequisites:**
    *   Node.js and npm/yarn installed.
    *   MongoDB database (or compatible) set up and running.
    *   Create a `.env` file in the root directory and define the following environment variables:
        *   `PORT`: The port number for the server (e.g., `8000`).
        *   `MONGO_URI`: The connection string for your MongoDB database.
        *   `JWT_SECRET`: Secret key for JWT.
        *   `CLIENT_URL`: The URL of the frontend client application (e.g., `http://localhost:5173`).  Multiple URLs can be specified, separated by commas.
    *   Install project dependencies `npm install` (or `yarn install`).
2.  **Running the Server:**
    *   Navigate to the project's root directory in your terminal.
    *   Run the server using `node index.js` or `npm start`.  The server will start on the port specified in your `.env` file (default: 8000).
3.  **API Usage (example):**

    *   **Authentication:**
        *   `POST /api/register` - Registers a new user.
        *   `POST /api/login` - Logs in a user.
        *   `POST /api/logout` - Logs out a user.
    *   **Crime Records:**
        *   `POST /api/crime/add` - Adds a new crime record.
        *   `GET /api/crime/all` - Retrieves all crime records.
        *   `GET /api/crime/:id` - Retrieves a specific crime record by ID.
        *   `PUT /api/crime/:id` - Updates a crime record by ID.
        *   `DELETE /api/crime/:id` - Deletes a crime record by ID.

## Technologies Used

*   **Languages:** JavaScript
*   **Frameworks/Libraries:**
    *   Node.js
    *   Express.js
    *   dotenv
    *   cookie-parser
    *   cors
    *   jsonwebtoken
    *   bcrypt
    *   mongoose
*   **Database:** MongoDB
*   **Other:**  Path module, file system operations.

## Architecture or Code Overview

*   **`index.js`:** The main entry point of the application. It sets up the Express server, middleware (JSON parsing, CORS, cookie-parser), routes, and connects to the database.
*   **`Config/db.js`:**  Handles the MongoDB database connection.
*   **`Routes/`:** Contains route definitions for authentication (`auth.routes.js`) and crime record management (`crime.routes.js`).
*   **`Controllers/`:**  Handles the business logic for authentication and crime record management.
*   **`Models/`:** Defines the data models for users and crime records using Mongoose.
*   **Middleware:**
    *   `express.json()`: Parses JSON request bodies.
    *   `cookie-parser()`: Parses cookies.
    *   `cors()`: Configures CORS to allow requests from the frontend and potentially other origins.

## Known Issues / Improvements

*   **Error Handling:** Implement more comprehensive error handling and logging.
*   **Input Validation:** Add robust input validation for all API endpoints to prevent security vulnerabilities.
*   **Security:** Enhance security measures, including input sanitization, protection against common attacks (e.g., XSS, CSRF), and consider rate limiting.
*   **File Storage:**  Consider cloud storage solutions (e.g., AWS S3, Google Cloud Storage) for more scalable and reliable file storage.
*   **Testing:** Implement unit and integration tests.
*   **Documentation:** Expand documentation with OpenAPI/Swagger.

## Additional Notes or References

*   This project uses a basic folder structure.  Further development might necessitate more complex organizational patterns.
*   The CORS configuration allows requests from specified origins. Adapt the `allowedOrigins` array to reflect the frontend's deployment URL(s).
*   The uploaded evidence files are served statically from the `Backend/uploads` directory.