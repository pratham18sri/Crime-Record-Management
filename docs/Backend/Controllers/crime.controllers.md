# Crime Report API

## Description

This project provides API endpoints for managing crime reports. It allows users to create, retrieve, and update crime reports, including attaching evidence. It supports features like assigning officers and updating report statuses.

## Folder Structure

```
├── crime.controllers.js
├── crime.model.js (assumed)
└── ... (other files/folders)
```

## How to Use

### Installation

No specific installation instructions are available from the provided code. Assuming this is a Node.js/Express application, typical setup involves:

1.  **Project Setup:**  Initialize a Node.js project (e.g., `npm init -y`)
2.  **Dependencies:** Install dependencies (e.g., `npm install express mongoose multer`)
3.  **Environment Setup:** Configure environment variables (database connection, etc.)

### API Usage

The following API endpoints are defined in this controller:

*   **POST `/crime-reports`**: Creates a new crime report.
    *   **Payload:**  JSON data in `req.body.crimeData`, and/or files in `req.files`.
    *   **Fields**:  `title`, `description`, `location`, `incidentDate`, `witnesses`, `suspectInfo`, and file uploads (evidence).
    *   **Returns:**  JSON with success status, report details.
*   **GET `/crime-reports`**: Retrieves crime reports for the logged-in user.
    *   Requires a logged-in user context (`req.user`).
    *   **Returns:**  JSON with success status, an array of reports.
*   **GET `/crime-reports/all`**: Retrieves all crime reports.
    *   **Returns:** JSON with success status, an array of all reports.
*   **PUT `/crime-reports/:id/assign-officer`**: Assigns an officer to a crime report.
    *   **Parameters:** `id` (report ID).
    *   **Payload:** `officerId` (optional, to assign a specific officer).
    *   Requires a logged-in user context (`req.user`).
    *   **Returns:**  JSON with success status, updated report.
*   **PUT `/crime-reports/:id/update-status`**: Updates the status of a crime report.
    *   **Parameters:** `id` (report ID).
    *   **Payload:** `status` (one of: `pending`, `investigating`, `resolved`, `closed`).
    *   **Returns:** JSON with success status, updated report.

## Technologies Used

*   **Node.js**: JavaScript runtime environment
*   **Express.js**: Web application framework (implied)
*   **MongoDB/Mongoose**: (Implied) Database and Object-Document Mapper
*   **Multer**:  Middleware for handling `multipart/form-data` (file uploads) (implied)

## Architecture or Code Overview

The `crime.controllers.js` file contains the logic for handling API requests related to crime reports.

*   **`createCrimeReport`**: Handles creation of new crime reports, including file uploads for evidence. Parses JSON payloads, creates a `CrimeReport` model instance, saves it to the database, and returns the saved report.
*   **`getCrimeReports`**: Retrieves crime reports associated with the logged-in user.
*   **`getAllReports`**: Retrieves all crime reports.
*   **`assignOfficer`**: Assigns an officer to a specified crime report.
*   **`updateStatus`**: Updates the status of a specified crime report.
*   **`detectFileType`**: Helper function to determine the type of an uploaded file based on its MIME type.
*   **Model Interactions:** The controller interacts with a `CrimeReport` model to persist and retrieve data from a database.
*   **Error Handling:** Includes basic error handling with HTTP status codes and error messages.

## Known Issues / Improvements

*   **Authentication/Authorization:**  This code assumes the presence of a user context (`req.user`). Implementation of authentication and authorization is required.
*   **Input Validation:**  Implement more robust input validation to prevent security vulnerabilities and data integrity issues.
*   **File Storage:**  The code saves uploaded files to a local `/uploads` directory. Consider using cloud storage (e.g., AWS S3, Google Cloud Storage) for production environments.
*   **Error Handling:** Improve error handling with more detailed logging and specific error messages.
*   **Security**: Implement proper input sanitization and secure file handling.

## Additional Notes or References

*   This documentation assumes supporting files, such as `crime.model.js`, exist and provide the data model.
*   The code uses `/uploads` as a static file serving directory. Make sure to configure this correctly in your Express application.