# UserDashboard

## Description

The `UserDashboard` component is a React application providing a dashboard interface for citizen users within a Crime Management System. It displays user-specific information, including an overview of reports, cases, messages, and resources.  It also provides navigation to other sections like report filing, case management, and settings.  The dashboard includes mock data for demonstration.

## How to Use

This component is designed to be integrated into a larger React application.

1.  **Prerequisites**: Ensure you have a React development environment set up. You'll need `react`, `react-router-dom`, and a context provider (`dataContext`) to manage user data.
2.  **Installation**:  No specific installation steps are required for this component as it's meant to be part of a larger React application. Ensure all dependencies are installed.
3.  **Usage**:
    *   Import the `UserDashboard` component into your application.
    *   Wrap it within a route using `react-router-dom` to handle navigation.
    *   Provide `currentUser` and `logout` through a context (e.g., `dataContext`) which is managing user authentication state.
    *   Use the navigation links provided within the sidebar to navigate to other views.

Example:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/usercontex'; // Assuming this is where your context provider is
import UserDashboard from './UserDashboard';
import Login from './Login'; // Example Login component

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/user/*" element={<UserDashboard />} />
          <Route path="/" element={<Login />} />  {/* Redirect to login if not authenticated or no specific route */}
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
```

## Technologies Used

*   React
*   `react-router-dom` (for routing)
*   JavaScript (ES6+)
*   JSX
*   Tailwind CSS (for styling - class names are present)

## Architecture or Code Overview

*   **`UserDashboard` Component**:
    *   Manages the overall dashboard layout and structure.
    *   Uses `useState` to manage the active tab for the sidebar navigation.
    *   Uses `useContext` to access user context data (e.g., `currentUser`, `logout`).
    *   Includes a header with user information and a logout button.
    *   Contains a sidebar with navigation links to different sections.
    *   Renders different tab content based on the `activeTab` state.
    *   Uses mock data to populate the dashboard.
*   **`OverviewTab` Component**:
    *   Displays key statistics, recent activity, and active cases.
    *   Renders data using the provided `dashboardData` prop.
*   **Routing**: Uses `react-router-dom` to handle navigation between different sections of the dashboard.
*   **Styling**: Utilizes Tailwind CSS for styling the components (class names present in the JSX).

## Known Issues / Improvements

*   **Data Source**:  The dashboard currently uses mock data. Integration with a backend API is needed to fetch and display dynamic data.
*   **Component Composition**: Consider breaking down the dashboard into more reusable, smaller components for better maintainability and reusability.
*   **Error Handling**:  Implement error handling for API calls or data fetching.
*   **Accessibility**: Improve accessibility by adding ARIA attributes and ensuring proper semantic HTML.
*   **Navigation**: Implement actual navigation for the links.

## Additional Notes or References

*   The code uses context (`dataContext`) for managing user authentication and potentially other user-related data.  Ensure this context is properly implemented and accessible throughout the application.
*   This component assumes the existence of several child components (e.g., `ReportCrimeLink`, `MyCasesLink`, etc.) to render the specific content of each tab.
*   Tailwind CSS is used for styling.