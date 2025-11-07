# Safety Resources

## Description

The Safety Resources component provides a user-friendly interface for accessing safety guides, emergency contacts, legal resources, and support services. It categorizes resources for easy navigation and includes quick safety tips.

## How to Use

This component is designed to be integrated into a React application.  No specific installation or CLI usage is applicable as it is a UI component.

To use:

1.  **Import the component:** `import Resources from './Resources';`
2.  **Render the component:** `<Resources />`

## Technologies Used

*   React
*   JavaScript (ES6+)
*   Tailwind CSS (for styling - utilized classes for styling in the JSX)

## Architecture or Code Overview

The `Resources` component manages and displays safety-related information categorized for easy access.

*   **State Management:** Uses `useState` to manage the currently active category.
*   **Data Structures:** The `resources` object stores resource data categorized by topic (safety, emergency, legal, support). The `emergencyContacts` array stores contact details.
*   **Dynamic Rendering:**  The component dynamically renders content based on the `activeCategory` state, displaying different resources for each category.
*   **Styling:** Utilizes Tailwind CSS utility classes directly within the JSX for styling and layout.
*   **Emergency Contacts Section:** Displays emergency contact information.
*   **Category Navigation:** Provides a navigation menu to switch between different resource categories.
*   **Resource Display:** Displays a list of resources for the selected category.
*   **Quick Tips Section:** Presents brief safety tips.
*   **`getTypeColor` Function:** A helper function that returns the Tailwind CSS class names for background and text colors based on the resource type.

## Known Issues / Improvements

*   Implement the "Call" and "Download" buttons with actual functionality (e.g., triggering a phone call or initiating a download).
*   Add dynamic content loading (e.g., from an API or database) instead of hardcoded data.
*   Add more detailed resource pages for the "View Details" button.

## Additional Notes or References

The component utilizes Tailwind CSS for styling.  No external libraries or dependencies are used apart from React itself.