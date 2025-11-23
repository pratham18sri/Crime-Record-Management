# Login Component

## Description

The `Login` component is a React component responsible for handling user authentication in the Crime Management System. It provides a secure login interface with different roles (user and police) and integrates with a backend API for authentication. The component includes a visually appealing UI with animated backgrounds and clear prompts for the user.

## How to Use

1.  **Installation:**

    This component is intended to be used within a React application. Ensure you have the necessary dependencies installed (React, React Router, Axios).

2.  **Usage:**

    ```jsx
    import React from 'react';
    import Login from './Login'; // Adjust the import path as necessary

    function App() {
      return (
        <div>
          <Login />
        </div>
      );
    }

    export default App;
    ```

    The component will render a login form. Users can select their role (citizen or police officer), enter their credentials, and submit the form to authenticate. Upon successful login, the user is redirected to the appropriate dashboard.

## Technologies Used

*   **React:** JavaScript library for building user interfaces.
*   **React Router:** For navigation and routing within the application.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **JavaScript (ES6+):** Programming language.
*   **HTML:** For structure.
*   **CSS (Tailwind CSS):** For styling and layout.
*   **Context API:**  `dataContext` is used to manage global state and share data (like the server URL and the refreshUser function) across components.

## Architecture or Code Overview

*   **State Management:**
    *   `username`, `email`, `password`:  Handles user input for login credentials.
    *   `useEmail`: A boolean to switch between username and email login for users.
    *   `loginAs`:  Stores the selected role ('user' or 'police').
    *   `isLoading`:  Indicates whether a login request is in progress.
*   **Context:**
    *   `dataContext`: Consumes the `serverUrl` and `refreshUser`  from a global context to make API requests and update user session.
*   **Functions:**
    *   `handleSubmit(e)`: Handles the form submission. It makes an API call to the `/api/login` endpoint using Axios.  Upon successful authentication, calls `refreshUser()` to update the user session, and navigates the user to their respective dashboard.  Handles error cases and displays error messages to the user.
    *   `fillPolice()`: Pre-fills the login form with police credentials for quicker testing.
    *   `fillDemoUser()`:  Pre-fills the login form with demo user credentials.
*   **UI Components:**
    *   Uses a combination of Tailwind CSS classes to style the login form and its elements, including the animated background, role selection buttons, and form inputs.
    *   Provides visual feedback during the login process using a loading indicator.
    *   Includes a "Quick Fill" button for police and demo users to streamline testing.
    *   Provides links to signup and other pages.

## Known Issues / Improvements

*   **Error Handling:** Improve the display of error messages to be more user-friendly.  Consider more detailed error messages from the backend.
*   **Security:** Further enhance security measures, like implementing input validation and sanitization.
*   **Accessibility:** Review and improve the component's accessibility (e.g., ARIA attributes, keyboard navigation).
*   **Refactor:** Consider breaking down the component into smaller, more manageable sub-components for improved readability and maintainability.

## Additional Notes or References

*   The component uses `axios` to make POST requests to a backend API for authentication. The `serverUrl` is expected to be provided by the `dataContext`.
*   The component includes a visually appealing UI using Tailwind CSS for styling and layout.
*   The police login uses a hardcoded officer ID for testing purposes, which should be replaced with a secure method for production.
*   License: This component is provided without a specific license; please adhere to the project's overall licensing terms if applicable.