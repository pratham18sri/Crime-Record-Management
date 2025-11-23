# Authentication Controllers

## Description

This project provides authentication controllers for user signup, login, and logout functionalities. It handles user registration, authentication, and session management using cookies. Includes special handling for police login.

## Folder Structure

```
auth.controllers.js
```

## How to Use

1.  **Installation:**

    No specific installation steps are required for this file as it is a controller file.

2.  **Usage:**

    This file exports functions used as route handlers. These functions are typically called from route definitions in your application.

    *   `signUp`: Handles user registration.
    *   `login`: Handles user login, including special handling for a 'police' user.
    *   `logout`: Handles user logout, clearing the authentication token.

    Example (in a route file):

    ```javascript
    import express from 'express';
    import { signUp, login, logout } from './auth.controllers.js';

    const router = express.Router();

    router.post('/signup', signUp);
    router.post('/login', login);
    router.post('/logout', logout);

    export default router;
    ```

## Technologies Used

*   JavaScript
*   Node.js
*   Express.js (Implied, for routing)
*   bcryptjs (Password hashing)
*   jsonwebtoken (Implied, used for token generation - in `../Config/token.js`)
*   Mongoose (Implied, for database interaction - using `User` model from `../models/user.model.js`)

## Architecture or Code Overview

*   **`signUp` Function:**
    *   Takes user data (firstname, lastname, email, password, username) from the request body.
    *   Validates the required fields.
    *   Prevents signup as 'police' via public signup endpoint.
    *   Checks if the user already exists.
    *   Hashes the password using bcrypt.
    *   Creates a new user in the database.
    *   Generates a JWT token.
    *   Sets the token as an HTTP-only cookie.
    *   Returns a success message with user details.

*   **`login` Function:**
    *   Takes username/email and password from the request body.
    *   Validates the input.
    *   Handles a special 'police' login with fixed credentials.
    *   Finds the user by username or email.
    *   Compares the provided password with the stored password (using bcrypt).
    *   Generates a JWT token.
    *   Sets the token as an HTTP-only cookie.
    *   Returns a success message with user details.

*   **`logout` Function:**
    *   Clears the authentication token by setting the cookie to an empty string and setting its maxAge to 0.

## Known Issues / Improvements

*   Error handling could be enhanced for specific database operation failures.
*   Input validation could be improved (e.g., email format validation).
*   Consider adding CSRF protection for enhanced security.
*   Implement refresh tokens for more robust session management.

## Additional Notes or References

*   The code assumes the existence of `../models/user.model.js` which defines the User model, and `../Config/token.js` which generates JWT tokens.
*   The `POLICE_ID` and `POLICE_PWD` environment variables are used for a special police user. Make sure these are properly configured in your environment.
*   The `httpOnly`, `secure`, and `sameSite` cookie attributes are set for security best practices.
*   The `maxAge` option for the cookie is set to 7 days.