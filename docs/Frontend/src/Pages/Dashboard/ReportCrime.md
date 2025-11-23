# ReportCrime Component

## Folder Structure

```
├── ReportCrime.jsx
```

## Description

The `ReportCrime` component is a React form designed for users to report crime incidents. It allows users to input detailed information about the crime, including the type of incident, date, time, location, description, suspect information, and witness details. It also supports file uploads for evidence and includes a checkbox for emergency declarations. The component submits the report to a backend API.

## How to Use

1.  **Installation:**

    *   Ensure you have a React environment set up.
    *   This component is designed to be used within a React application.
    *   It utilizes `axios` for API requests and `react-router-dom` for navigation.
    *   Requires a `dataContext` context to be provided for `serverUrl`.
2.  **Usage:**

    *   Import the `ReportCrime` component into your application.
    *   Render the component where you want the crime reporting form to appear.
    *   The component handles user input, form submission, and displays success or error messages.
    *   The component uses context for `serverUrl`.
    *   The form submits data to a backend API endpoint.

    ```jsx
    import ReportCrime from './ReportCrime';

    function App() {
      return (
        <ReportCrime />
      );
    }
    ```

## Technologies Used

*   React
*   Axios (for API requests)
*   React Router DOM (for navigation)
*   HTML
*   CSS (Tailwind CSS for styling)

## Architecture or Code Overview

1.  **State Management:**
    *   `formData`: Manages the form input values, including incident details, location, and suspect/witness information.
    *   `selectedFiles`: Stores the files selected for upload.
    *   `loading`: Indicates whether the form is submitting.
    *   `error`: Stores any error messages that occur during submission.
2.  **Form Fields:**
    *   The form includes various input fields for different crime-related details, such as incident type, date, time, location (address, city, state, pincode), description, suspect information, witness information, and an emergency declaration checkbox.
3.  **File Upload:**
    *   Allows users to upload files as evidence.
4.  **Event Handlers:**
    *   `handleChange`: Handles changes in form input fields, updating the `formData` state. It also handles nested `location` object updates.
    *   `handleFileChange`: Handles file selection, updating the `selectedFiles` state.
    *   `handleSubmit`: Handles form submission.
        *   Formats the date and time from the input fields.
        *   Formats the witness information into an array of objects.
        *   Creates `FormData` object and appends files and crime data.
        *   Sends a POST request to the server using Axios.
        *   Displays success/error messages based on the API response.
        *   Resets the form after successful submission.
5.  **API Integration:**
    *   Uses `axios` to send a POST request to the `/api/crime/report` endpoint.
    *   Sets `Content-Type` to `multipart/form-data` for file uploads.
    *   Uses context for fetching server URL.
6.  **Navigation:**
    *   Uses `useNavigate` from `react-router-dom` to navigate to the dashboard after a successful submission.
7.  **Error Handling:**
    *   Includes a `try...catch` block to handle potential errors during the API request.
    *   Displays error messages to the user if the submission fails.

## Known Issues / Improvements

*   **Input Validation:** Implement more robust client-side input validation to ensure data integrity and improve user experience.
*   **File Size Limit:** Implement server-side validation for file size limits.
*   **Witness Handling:** Improve the handling of witness information to better support multiple witnesses.
*   **Accessibility:** Improve accessibility for users with disabilities.
*   **UI/UX:** Further UI/UX improvements such as adding more user-friendly messages, loading indicators, and better error messages.

## Additional Notes or References

*   The component uses Tailwind CSS for styling.
*   The component utilizes `react-router-dom` to navigate after form submission.
*   The component receives the server URL through the `dataContext`.