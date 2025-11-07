# Police Dashboard

## Description

The Police Dashboard is a React-based application providing a comprehensive interface for police officers to manage reports, view active cases, and access other relevant information. It includes features for viewing reports, filtering, assigning reports, and updating their status. It uses a mock API to simulate backend data.

## Folder Structure

```
├── PoliceDashboard.jsx
└── ... (other files in the project)
```

## How to Use

1.  **Installation:** (Assumed - details omitted as not directly present in code)

2.  **Usage:**
    *   Navigate through the dashboard using the sidebar navigation.
    *   View an overview of the police operations with key statistics.
    *   View and manage crime reports with filtering and status updates.
    *   Assign and change status of the reports.

## Technologies Used

*   React
*   Axios (for API calls)
*   React Router (for navigation)
*   Context API (for state management)
*   JavaScript (ES6+)
*   JSX
*   CSS (assumed with the use of Tailwind classes)

## Architecture or Code Overview

*   **`PoliceDashboard.jsx`**: The main component rendering the entire dashboard.
    *   Manages the active tab (overview, reports, cases, etc.)
    *   Fetches reports from a mock API.
    *   Renders the header, sidebar navigation, and the content for the selected tab.
    *   Uses Context API to access `currentUser` and `serverUrl`.
*   **`OverviewTab`**: Renders the overview dashboard.
    *   Displays statistics such as total, active, pending, and solved cases.
    *   Displays recent activity and assigned cases.
*   **`ReportsTab`**: Renders the reports view
    *   Fetches crime reports.
    *   Allows assigning and updating the status of reports.
*   **Context API**: Used to access `currentUser` and `serverUrl`
*   Navigation is implemented via `react-router-dom`

## Known Issues / Improvements

*   The application uses a mock API, and should be connected to the backend.
*   More detailed functionality within each tab needs to be implemented.
*   The components could be further refactored for better organization.
*   Error handling for network requests could be improved.
*   Implement authentication and authorization.

## Additional Notes or References

*   The code uses Tailwind CSS for styling.