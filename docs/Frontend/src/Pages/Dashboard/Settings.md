# Account Settings

## Description

This project provides a React component for managing user account settings, including profile information and notification preferences. It utilizes context for user data and offers a clean and responsive UI.

## Folder Structure

```
├── Settings.jsx
└── context/usercontex.jsx  (Assumed location of context file)
```

## How to Use

1.  **Installation:**

    No specific installation steps are needed as it's a React component. Ensure you have React and required dependencies (e.g., `tailwindcss`) installed in your project.

2.  **Usage:**

    Import and render the `Settings` component within your application. The component will automatically fetch user data from the provided context (`dataContext`).

    ```jsx
    import Settings from './Settings';

    function App() {
      return (
        <Settings />
      );
    }
    ```

## Technologies Used

*   React
*   Tailwind CSS (for styling - class names used in the component indicate this)
*   JavaScript (ES6+)

## Architecture or Code Overview

The `Settings` component manages account settings, providing two main tabs: "Profile Information" and "Notifications".

*   **State Management:**
    *   `activeTab`: Tracks the currently selected tab ('profile', 'preferences').
    *   `isEditing`: Controls the edit mode for profile information.
    *   `profileData`: Stores user profile information, initialized from the `currentUser` context.
    *   `preferences`: Manages notification settings (email, SMS, push, location).

*   **Context:**
    *   Uses a `dataContext` (imported from `../../context/usercontex.jsx`) to access user-related data, specifically `currentUser`.

*   **Tabs:**
    *   `renderTabContent()`: Renders the content of the selected tab based on `activeTab`.
    *   `ProfileTab`:  Allows editing user profile data. Includes input fields for name, email, phone, and address. Provides "Edit" and "Save/Cancel" buttons.
    *   `PreferencesTab`:  Displays notification settings and provides toggle switches for enabling/disabling each notification type.

*   **Event Handlers:**
    *   `handleProfileSave()`: Saves profile changes (currently displays an alert).
    *   `handleToggle(key)`: Toggles the state of a specific preference setting.

## Known Issues / Improvements

*   **No backend integration:** Profile updates and preference changes are not persisted to a backend. The `handleProfileSave` function currently only displays an alert.
*   **Error Handling:** No error handling is implemented.
*   **Data Validation:** No input validation is implemented.
*   **User Feedback:** Improve user feedback (e.g., confirmation messages on successful save)

## Additional Notes or References

*   The styling is implemented using Tailwind CSS utility classes.
*   The project relies on a `dataContext` to retrieve and provide user data.
*   The `ProfileTab` component utilizes controlled components for input fields.