# Authentication Middleware

## Description

This middleware provides authentication and authorization functionalities for a Node.js application, specifically using JWTs (JSON Web Tokens) to verify user sessions. It handles token verification, user retrieval, and role-based access control.

## How to Use

1.  **Installation:**

    No specific installation steps are needed, as this is a middleware for an existing Node.js project. Ensure that `jsonwebtoken` is installed:

    ```bash
    npm install jsonwebtoken
    ```

2.  **Usage:**

    Import and use the `authenticate` middleware to protect routes that require user authentication.  Use `requirePolice` middleware for routes that only allow access to users with 'police' role.

    ```javascript
    import express from 'express';
    import { authenticate, requirePolice } from './auth.middleware.js';

    const app = express();

    // Protected route requiring authentication
    app.get('/profile', authenticate, (req, res) => {
      res.json({ user: req.user });
    });

    // Protected route requiring police role
    app.get('/police-only', authenticate, requirePolice, (req, res) => {
      res.json({ message: 'Police access granted' });
    });
    ```

## Technologies Used

*   **Node.js**
*   **Express.js** (Implied)
*   **jsonwebtoken**
*   **Mongoose** (Implied, for User model)

## Architecture or Code Overview

The middleware consists of two main functions:

*   `authenticate`:  This function attempts to retrieve and verify a JWT from the `token` cookie. It then retrieves the user from the database based on the token's payload (user ID).  Handles "police-officer" as a special case where a user is mocked to allow access.

*   `requirePolice`: This function checks if the authenticated user has the 'police' role, or if user is a valid mock police user, and grants access accordingly.

## Known Issues / Improvements

*   **Error Handling:** The error handling could be improved with more specific error messages and logging.
*   **Token Storage:** Currently relies on cookies. This may need adjustments depending on the frontend's needs.
*   **Testing:** Unit tests should be added to verify functionality.

## Additional Notes or References

*   The code assumes the existence of a `User` model with an `findById` method.
*   Requires `JWT_SECRET` and optionally `POLICE_ID` environment variables to be set.