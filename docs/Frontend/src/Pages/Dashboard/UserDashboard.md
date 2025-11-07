# Crime Management System - User Dashboard

## Description

The User Dashboard provides a citizen-facing interface for interacting with the Crime Management System. It allows users to view an overview of their account, file reports, view active cases, manage messages, access resources, and adjust settings.

## Folder Structure

```
├── UserDashboard.jsx
└── ... (other related files/folders)
```

## How to Use

The `UserDashboard` component is designed to be integrated into a larger React application. It's intended to be rendered within a route accessible to authenticated users.

1.  **Installation**:  Ensure you have a React environment set up and React Router installed for navigation.
2.  **Integration**: Import `UserDashboard` and render it within the appropriate route.
3.  **Authentication**: The component expects user data to be available through a context provider (`dataContext` in this case). The current user data is used for display purposes, and authentication must be handled externally.
4.  **Navigation**: The dashboard uses `react-router-dom`'s `useNavigate` hook for navigating between different sections (e.g., filing a report, viewing cases).  Ensure the navigation routes are correctly configured.

## Technologies Used

*   **React**: JavaScript library for building user interfaces.
*   **React Router Dom**: For handling navigation and routing.
*   **Context API**:  Used for state management to provide user data.
*   **Tailwind CSS**: Utility-first CSS framework for styling the components.
*   **JavaScript (ES6+)**

## Architecture or Code Overview

The `UserDashboard` component is the main entry point for the user dashboard.

*   **State Management**: `useState` hook manages the active tab.
*   **Context**: Uses `useContext` to access user data from a `dataContext` (assumed to be defined elsewhere).
*   **Routing**: Uses `useNavigate` for navigation.
*   **Tab Rendering**:  `renderTabContent` function conditionally renders the content of each tab.
*   **Dashboard Data**:  `dashboardData` is mock data used to populate the dashboard UI.
*   **UI Structure**:  The component uses a responsive grid layout with a sidebar navigation and a main content area.
*   **OverviewTab Component**: A child component that renders the dashboard overview, including stats, recent activity, and active cases.  This component uses its own props to display the received data.
*   **Navigation**: Uses buttons to navigate the different sections.
*   **Mock Data**: The code uses mock data for the dashboard to showcase the functionality. The data should ideally be fetched from an API in a real-world scenario.

## Known Issues / Improvements

*   **Data Fetching**: The dashboard currently uses hardcoded mock data.  Implement data fetching from an API or other data sources.
*   **Component Implementation**:  The tab content components (`ReportCrimeLink`, `MyCasesLink`, `MessagesLink`, `ResourcesLink`, `SettingsLink`) are stubs. Implement these components with appropriate UI and functionality.
*   **Authentication**:  The current implementation assumes the availability of a `currentUser` object.  Integrate the actual authentication logic.
*   **Error Handling**: Add proper error handling for data fetching and other operations.
*   **Responsiveness**: Further testing and refinement of the responsiveness is required for different screen sizes.

## Additional Notes or References

*   The code uses Tailwind CSS for styling. Ensure Tailwind CSS is configured in the project.
*   The `dataContext` is assumed to be available. Implement the provider as per your application's requirements.