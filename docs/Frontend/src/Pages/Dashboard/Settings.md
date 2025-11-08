# Account Settings

## Description

This project provides a settings page component built with React. It allows users to manage their profile information and notification preferences. The component utilizes a tabbed interface with separate sections for profile details and notification settings.

## How to Use

1.  **Installation:**

    No specific installation steps are needed for this component, as it's designed to be integrated into a larger React application.

2.  **Usage:**

    Import the `Settings` component into your application and render it where you want the settings page to appear:

    ```jsx
    import Settings from './Settings';

    function App() {
      return (
        <div>
          <Settings />
        </div>
      );
    }

    export default App;
    ```

## Technologies Used

*   React
*   JavaScript (ES6+)
*   JSX
*   Tailwind CSS (for styling - classes like `bg-gray-900`, `text-white`, `rounded-2xl`, etc. are used)
*   React Context (used via `dataContext` to access user information)

## Architecture or Code Overview

The `Settings` component is the main component, managing the overall structure and state.

*   **State Management:**
    *   `activeTab`: Tracks the currently selected tab ('profile' or 'preferences').
    *   `isEditing`: Controls the edit mode for the profile information.
    *   `profileData`: Stores the user's profile information.  Initialized with default values and updated based on the `currentUser` context.
    *   `preferences`: Stores the user's notification preferences.

*   **Context:**
    *   The component consumes `dataContext` to access the `currentUser` object.

*   **Tab Rendering:**
    *   `renderTabContent()`: Dynamically renders the content of the selected tab using a `switch` statement.

*   **Profile Tab (`ProfileTab` Component):**
    *   Displays and allows editing of profile information (first name, last name, email, phone, address).
    *   `handleChange()`: Updates `profileData` based on input changes.
    *   Provides "Edit Profile" and "Save Changes/Cancel" buttons to control the editing state.

*   **Preferences Tab (`PreferencesTab` Component):**
    *   Displays notification preferences (email, SMS, push notifications, location sharing).
    *   `handleToggle()`: Toggles the state of each preference.

*   **UI Structure:**
    *   Uses a grid layout for the overall page structure (navigation and content).
    *   Navigation uses a list of buttons for switching between tabs.
    *   Uses Tailwind CSS classes for styling.

## Known Issues / Improvements

*   **Data Persistence:** Currently, profile updates are simulated with an alert.  Implement actual data saving (e.g., API calls) to persist user data.
*   **Context Setup:**  Ensure the `dataContext` is properly set up and the `currentUser` is populated.
*   **Error Handling:** Add error handling (e.g., validation for profile fields, error messages for saving).
*   **Accessibility:** Consider accessibility improvements (e.g., keyboard navigation, ARIA attributes).

## Additional Notes or References

*   The code uses Tailwind CSS for styling, which is not included in this code snippet.
*   This component assumes the existence of a `dataContext` providing user data.