# Safety Resources

## Description

This React component provides a user-friendly interface to access various safety and support resources. It categorizes information into safety guides, emergency contacts, legal resources, and support services. The component also includes quick safety tips and emergency contact information.

## Technologies Used

*   React
*   Tailwind CSS (for styling)

## Architecture or Code Overview

*   **`Resources.jsx`:** The main component that renders the UI.
    *   **State Management:** Uses `useState` to manage the currently active category.
    *   **Data Structures:** Defines `resources` (an object containing resource categories) and `emergencyContacts` (an array of contact objects).
    *   **Helper Functions:** `getTypeColor` determines the styling based on the resource type.
    *   **UI Structure:**
        *   Displays emergency contacts with call buttons.
        *   Provides a category navigation for switching between resource categories.
        *   Renders resources based on the selected category, displaying titles, descriptions, and types.
        *   Includes a section for quick safety tips.

## Known Issues / Improvements

*   Implement the "Call" button functionality.
*   Implement the "View Details" and "Download" buttons.
*   Add dynamic data fetching for resources.
*   Enhance mobile responsiveness.

## Additional Notes or References

*   Styling is done using Tailwind CSS utility classes.