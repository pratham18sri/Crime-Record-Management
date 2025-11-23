# User Context

## Folder Structure

*(No folder structure information available as only a single file is provided.)*

## Description

This React context provider manages user authentication and data fetching. It provides the current user's information, a function to refresh the user data, and a logout function. It fetches user data from a backend API, handling authentication via cookies.

## How to Use

1.  **Installation:**

    This component is a React context provider and is meant to be used within a React application. Ensure you have React and Axios installed. No specific installation is needed for this component itself.

2.  **Usage:**

    Wrap your application or components that need user context with the `UserContext` provider:

    ```jsx
    import UserContext from './usercontex'; // Assuming usercontex.jsx is in the same directory

    function App() {
        return (
            <UserContext>
                {/* Your application content that uses the user context */}
            </UserContext>
        );
    }

    export default App;
    ```

    Access the context values within child components using `useContext`:

    ```jsx
    import { useContext } from 'react';
    import { dataContext } from './usercontex';

    function MyComponent() {
        const { currentUser, logout } = useContext(dataContext);

        // Render based on user context
    }
    ```

## Technologies Used

*   React
*   Axios
*   JavaScript (ES6+)

## Architecture or Code Overview

*   **`dataContext`**: A React context created to share user-related data and functions.
*   **`UserContext` Component**:
    *   Manages the current user state (`currentUser`).
    *   Fetches the user from the backend API using `axios.get(`${serverUrl}/api/me`, { withCredentials: true })`.
    *   Provides `serverUrl`, `currentUser`, `refreshUser` (fetches user data), and `logout` functions to its children via the context provider.
    *   Uses `useCallback` for memoization of functions to prevent unnecessary re-renders.
    *   Uses `useEffect` to fetch user data on component mount and when `fetchCurrentUser` changes.
    *   Uses `useMemo` to memoize the context `value`.
*   **`fetchCurrentUser`**: Fetches current user details. Handles authentication errors by setting `currentUser` to `null`.
*   **`logout`**: Sends a logout request to the server and clears the `currentUser`.

## Known Issues / Improvements

*   **Error Handling**: The error handling in `fetchCurrentUser` and `logout` is basic (console logs). More robust error handling (e.g., displaying user-friendly messages, retrying on failure) can be implemented.
*   **Server URL Configuration**: The server URL uses `import.meta.env.VITE_SERVER_URL`. Ensure this environment variable is correctly set in your project.
*   **Loading State**: Consider adding a loading state while fetching the user data to provide a better user experience.
*   **Authentication Flow**: Additional features like handling login and registration can be implemented.

## Additional Notes or References

*   This component assumes the presence of a backend API endpoint at `/api/me` to fetch user data and `/api/logout` for logging out.
*   Authentication is handled using cookies, indicated by `withCredentials: true` in the Axios requests.