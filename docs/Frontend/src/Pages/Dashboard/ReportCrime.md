# ReportCrime Component

## Project Title

ReportCrime

## Folder Structure

_No folder structure available._

## Description

The `ReportCrime` component is a React component designed to allow users to file a crime report. It provides a form with various fields to capture details about the incident, including incident type, date, time, location, description, suspect information, witnesses, and the option to upload evidence. The component communicates with a backend API to submit the report and handles form validation, file uploads, and error handling.

## How to Use

1.  **Installation:**

    This component is intended to be used within a React application. Ensure you have React and required dependencies installed. No specific installation steps are needed for this component itself, as it's part of a larger application.

2.  **Usage:**

    Import and render the `ReportCrime` component within your application:

    ```jsx
    import ReportCrime from './ReportCrime';

    function App() {
      return (
        <div>
          <ReportCrime />
        </div>
      );
    }

    export default App;
    ```

## Technologies Used

*   **React:** JavaScript library for building user interfaces.
*   **Axios:**  Promise-based HTTP client for making API requests.
*   **React Router:** For navigation (using `useNavigate`).
*   **JavaScript (ES6+):**  For component logic and functionality.
*   **HTML:** For structuring the form.
*   **CSS (Tailwind CSS):** For styling the component.
*   **FormData:** For handling file uploads.

## Architecture or Code Overview

The `ReportCrime` component consists of the following key elements:

*   **State Management:**
    *   `formData`: Manages the form input values using the `useState` hook.
    *   `loading`: Indicates the loading state during API calls.
    *   `error`: Stores any error messages from API calls or form validation.
    *   `selectedFiles`: Stores the files selected for upload.
*   **Event Handlers:**
    *   `handleFileChange`: Handles file selection from the input.
    *   `handleSubmit`: Handles form submission, performs data formatting, API calls, and error handling.
    *   `handleChange`: Handles changes in form inputs, updating the `formData` state.
*   **API Integration:**
    *   Uses `axios` to make a POST request to the backend `/api/crime/report` endpoint.
    *   Formats the data into a `FormData` object for file uploads, including crime report data as a JSON string.
    *   Uses a context (`dataContext`) to get the server URL.
*   **UI Structure:**
    *   Uses a form with various input fields, including text inputs, a dropdown for incident types, date and time pickers, and a file upload input.
    *   Displays error messages and a loading indicator.
    *   Includes a warning message about the importance of accurate reporting.
    *   Uses Tailwind CSS for styling and layout.

## Known Issues / Improvements

*   **Date/Time Formatting:** Ensure that date and time formatting is handled consistently with the backend requirements.
*   **Validation:** Implement client-side form validation to improve user experience.
*   **File Upload Progress:** Add a progress indicator for file uploads.
*   **Error Handling:** Improve error handling and display more informative error messages to the user.
*   **Accessibility:** Review and improve the component's accessibility.

## Additional Notes or References

*   The component relies on an API endpoint (`/api/crime/report`) on the backend.
*   The `dataContext` context is used to get the server URL, which should be provided by a parent component or context provider.
*   The component uses Tailwind CSS for styling.