# User Model

**Folder Structure:**

[No folder structure available]

**Description:**

This project defines a Mongoose schema for a User model. It outlines the structure for storing user data, including fields for first name, last name, username, email, password, and role. The `role` field has an enum for 'user' and 'police' with 'user' as the default.

**How to Use:**

1.  **Installation:**

    Ensure you have Node.js and npm (or yarn) installed.  Install the necessary packages:

    ```bash
    npm install mongoose
    ```

2.  **Usage:**

    ```javascript
    import User from './user.model.js';

    // Example: Create a new user
    const newUser = new User({
        firstname: "John",
        lastname: "Doe",
        username: "johndoe123",
        email: "john.doe@example.com",
        password: "securePassword"
    });

    newUser.save()
        .then(user => console.log("User created:", user))
        .catch(err => console.error("Error creating user:", err));
    ```

**Technologies Used:**

*   JavaScript
*   Node.js
*   Mongoose

**Architecture or Code Overview:**

*   `userSchema`: Defines the structure of the user document with fields like `firstname`, `lastname`, `username`, `email`, `password`, and `role`.  `username` and `email` are unique.
*   `User`: A Mongoose model compiled from the `userSchema`.  It represents the user collection in the MongoDB database.
*   `timestamps:true`: Enables automatic `createdAt` and `updatedAt` timestamps.

**Known Issues / Improvements:**

*   Password hashing is not implemented. Passwords should be hashed before saving to the database.
*   Input validation could be enhanced.

**Additional Notes or References:**

*   This project uses Mongoose for defining the schema and interacting with a MongoDB database.