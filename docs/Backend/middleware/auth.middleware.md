# Authentication Middleware

## Description

This middleware provides authentication and authorization functionalities for a Node.js application, specifically using JSON Web Tokens (JWT) and user roles. It handles token verification, user retrieval, and role-based access control.

## How to Use

### Installation

No specific installation is needed; this is middleware for an existing application.

### Usage

1.  **Import:**

    ```javascript
    import { authenticate, requirePolice } from './auth.middleware.js';
    ```

2.  **Usage in routes:**

    ```javascript
    // Example usage for protected routes
    app.get('/profile', authenticate, (req, res) => {
      res.json({ user: req.user });
    });

    // Example usage for police-only routes
    app.get('/police-only', authenticate, requirePolice, (req, res) => {
      res.json({ message: 'Police access granted' });
    });
    ```

## Technologies Used

*   Node.js
*   `jsonwebtoken`: For JWT creation and verification.
*   `express`: Assumed for routing and middleware integration.
*   MongoDB (`User` model):  For user data retrieval. (Dependency)
*   `.env`: For environment variables (JWT_SECRET, POLICE_ID).

## Architecture or Code Overview

*   **`authenticate` middleware:**
    *   Retrieves the JWT from the `token` cookie.
    *   Verifies the token's validity using `jwt.verify()`.
    *   Retrieves the user from the database using `User.findById()`, excluding the password.
    *   Attaches the user object to `req.user`.
    *   Handles scenarios for missing tokens, invalid tokens, and non-existent users.
    *   Includes special handling for a "police-officer" ID, allowing for a pseudo user.
*   **`requirePolice` middleware:**
    *   Checks if the user is authenticated ( `req.user` exists).
    *   Verifies if the user's role is "police" or if user matches the pseudo police user.
    *   Returns a 403 Forbidden response if the user is not authorized.

## Known Issues / Improvements

*   Error handling could be improved (e.g., more specific error messages).
*   Token storage is cookie-based; consider alternatives like `localStorage` or `sessionStorage` or HTTP Headers for different security or UX considerations.
*   Consider implementing refresh tokens for extended sessions.

## Additional Notes or References

*   Requires the existence of a `User` model and appropriate environment variables (`JWT_SECRET`, `POLICE_ID`).
*   Requires a working JWT secret key to be set in your `.env` file.