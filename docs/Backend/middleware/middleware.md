# Authentication Middleware

## Folder Structure

```
.
└── auth.middleware.js
```

## Description

This project provides an authentication middleware for use in Node.js applications, specifically designed to verify JWT (JSON Web Tokens).

## How to Use

1.  **Installation:**

    ```bash
    npm install jsonwebtoken
    ```

2.  **Usage Example:**

    ```javascript
    const jwt = require('jsonwebtoken');

    function authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token == null) return res.sendStatus(401);

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    }

    // Example route using the middleware
    app.get('/protected', authenticateToken, (req, res) => {
      res.json({ message: 'Authorized!' });
    });
    ```

## Technologies Used

*   Node.js
*   jsonwebtoken

## Architecture or Code Overview

The `auth.middleware.js` file contains a single function: `authenticateToken`. This function is designed to be used as middleware. It extracts the JWT from the `Authorization` header, verifies the token using `jsonwebtoken.verify`, and attaches the decoded user information to the request object if the token is valid. If the token is invalid or missing, it returns the appropriate HTTP status codes (401 Unauthorized or 403 Forbidden).

## Known Issues / Improvements

*   Error handling for token verification failures could be more specific.
*   Consider adding support for other authentication methods.
*   Implement token refresh functionality.

## Additional Notes or References

*   This middleware assumes a token is sent in the `Authorization` header in the format `Bearer <token>`.
*   Requires the `process.env.TOKEN_SECRET` environment variable to be set.
*   Based on the official [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) documentation.