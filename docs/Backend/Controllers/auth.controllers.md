# Auth Controller

## Description

This project provides authentication controllers for user signup, login, and logout functionalities. It handles user registration, authentication, and session management using cookies. Includes special handling for a "police" user role with pre-defined credentials.

## How to Use

1.  **Installation:**

    *   Ensure you have Node.js and npm installed.
    *   Install dependencies (assumed to be managed by a `package.json` file in the project).
    *   Set environment variables, including `POLICE_ID` and `POLICE_PWD`.

2.  **API Usage:**

    *   **Signup:**

        *   `POST /api/signup` - Requires `firstname`, `lastname`, `email`, `password`, and `username` in the request body.
    *   **Login:**

        *   `POST /api/login` - Requires either `username` or `email`, and `password` in the request body.
    *   **Logout:**

        *   `POST /api/logout` - Clears the authentication token cookie.

3.  **Example Usage (Conceptual):**

    ```javascript
    // Assuming you have a route setup in your application (e.g., using Express)
    // Import controllers
    import * as authController from './auth.controllers.js';

    // Signup Route
    app.post('/api/signup', authController.signUp);

    // Login Route
    app.post('/api/login', authController.login);

    // Logout Route
    app.post('/api/logout', authController.logout);
    ```

## Technologies Used

*   Node.js
*   bcryptjs
*   jsonwebtoken (Assumed for `generateToken` function)
*   Cookies
*   MongoDB (Assumed, based on `user.model.js` import)

## Architecture or Code Overview

*   **`signUp(req, res)`:**
    *   Validates required fields (`firstname`, `lastname`, `email`, `password`, `username`).
    *   Prevents signup as "police" via the public signup endpoint based on username or email matching the `POLICE_ID` env variable.
    *   Checks for existing user by email.
    *   Hashes the password using `bcrypt`.
    *   Creates a new user in the database (assumed to be a MongoDB instance, based on `User.create`).
    *   Generates a JWT token using `generateToken`.
    *   Sets an HTTP-only, secure, and `sameSite: "None"` cookie with the token.
    *   Returns a success response with user details.
*   **`login(req, res)`:**
    *   Validates `username`/`email` and `password`.
    *   Handles special "police" login using hardcoded/environment variables `POLICE_ID` and `POLICE_PWD`.  Returns a token with "police" role.
    *   Finds the user by `username` or `email`.
    *   Compares the provided password with the hashed password using `bcrypt`.
    *   Generates a JWT token.
    *   Sets an HTTP-only, secure, and `sameSite: "None"` cookie.
    *   Returns a success response with user details.
*   **`logout(req, res)`:**
    *   Clears the authentication token cookie.
    *   Returns a success response.

## Known Issues / Improvements

*   Error handling can be improved with more descriptive error messages.
*   Security: Consider implementing rate limiting to prevent brute-force attacks.
*   Input validation:  More robust input validation (e.g., email format, password strength) can be implemented.
*   Database interaction: The code assumes a MongoDB database. Database connection and model definitions are outside the scope of this file.

## Additional Notes or References

*   The code relies on environment variables for sensitive information (e.g., `POLICE_ID`, `POLICE_PWD`), which should be set securely.
*   The `generateToken` function is not defined in this file. It is assumed to be defined in `./Config/token.js`.
*   The project uses `bcryptjs` for password hashing and salting.
*   The project uses cookies for authentication, and the cookie is set as `httpOnly`, `secure`, and `sameSite: "None"` to enhance security.