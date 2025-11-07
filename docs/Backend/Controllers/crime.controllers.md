# Crime Report API

## Description

This project provides API endpoints for managing crime reports. It allows users to create, retrieve, assign, and update the status of crime reports, including the ability to upload and associate evidence with each report.

## Folder Structure

(No folder structure provided, assuming a simple structure for context.)

## How to Use

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd [project_directory]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:** Configure the database connection and any other necessary environment variables.
4.  **Run the application:**
    ```bash
    npm start
    ```

### API Usage

*   **Create Crime Report:** `POST /api/crime-reports`
    *   Requires authentication.
    *   Supports `multipart/form-data` for evidence uploads (files).
    *   Expects a JSON payload containing `title`, `description`, `location`, `incidentDate`, `witnesses`, `suspectInfo`, and optionally `crimeData` which is a stringified JSON of the same.
    *   Example using `curl`:
        ```bash
        curl -X POST \
          -H "Authorization: Bearer <your_token>" \
          -F "crimeData={\"title\":\"Theft\",\"description\":\"Stolen car\",\"location\":\"Downtown\",\"incidentDate\":\"2024-01-20\"}" \
          -F "evidence=@/path/to/image.jpg" \
          http://localhost:3000/api/crime-reports
        ```

*   **Get User's Crime Reports:** `GET /api/crime-reports`
    *   Requires authentication.
    *   Returns a list of crime reports created by the authenticated user.
    *   Example using `curl`:
        ```bash
        curl -X GET \
          -H "Authorization: Bearer <your_token>" \
          http://localhost:3000/api/crime-reports
        ```

*   **Get All Crime Reports:** `GET /api/crime-reports/all`
    *   Requires admin privileges or a similar role-based access control.
    *   Returns a list of all crime reports.
    *   Example using `curl`:
        ```bash
        curl -X GET \
          -H "Authorization: Bearer <your_admin_token>" \
          http://localhost:3000/api/crime-reports/all
        ```

*   **Assign Officer to Report:** `PUT /api/crime-reports/:id/assign-officer`
    *   Requires authentication (typically for an officer or administrator).
    *   Requires the report `id` in the URL path and `officerId` in the request body (optional, defaults to logged-in user).
    *   Example using `curl`:
        ```bash
        curl -X PUT \
          -H "Authorization: Bearer <your_token>" \
          -H "Content-Type: application/json" \
          -d '{"officerId": "officer_user_id"}' \
          http://localhost:3000/api/crime-reports/report_id/assign-officer
        ```

*   **Update Report Status:** `PUT /api/crime-reports/:id/status`
    *   Requires authentication (officer or administrator).
    *   Requires the report `id` in the URL path and `status` in the request body (e.g., "pending", "investigating", "resolved", "closed").
    *   Example using `curl`:
        ```bash
        curl -X PUT \
          -H "Authorization: Bearer <your_token>" \
          -H "Content-Type: application/json" \
          -d '{"status": "investigating"}' \
          http://localhost:3000/api/crime-reports/report_id/status
        ```

## Technologies Used

*   **Node.js:** Runtime environment
*   **Express.js:** Web application framework
*   **MongoDB:** Database (likely inferred from `CrimeReport` model)
*   **Mongoose:** MongoDB object modeling tool (likely inferred from `CrimeReport` model)
*   **JWT (JSON Web Tokens):** Authentication (implied)
*   **Multer:**  Middleware for handling `multipart/form-data`, primarily for file uploads.

## Architecture or Code Overview

*   **Controllers (`crime.controllers.js`):** Contains the API endpoint logic.  Handles requests, interacts with the `CrimeReport` model, and sends responses.  Key functions:
    *   `createCrimeReport`: Creates a new crime report, handles file uploads and JSON parsing from form data.
    *   `getCrimeReports`: Retrieves crime reports for the authenticated user.
    *   `getAllReports`: Retrieves all crime reports (admin only).
    *   `assignOfficer`: Assigns an officer to a crime report.
    *   `updateStatus`: Updates the status of a crime report.
*   **Models (`crime.model.js`):** Defines the data structure for crime reports (not shown).
*   **Helpers:** `detectFileType` function determines the type of uploaded files based on MIME type.
*   **Authentication Middleware:**  Used to verify JWT tokens before allowing access to protected routes. (Implied)
*   **File Uploads:**  Uses `multer` middleware to handle file uploads, storing files in an "uploads" directory (implied).

## Known Issues / Improvements

*   **Authentication:**  Implementation details of authentication (JWT) are not provided.
*   **Error Handling:**  More robust error handling and logging could be implemented.
*   **Input Validation:**  Implement input validation for all request data to prevent security vulnerabilities.
*   **File Storage:**  Consider more robust file storage solutions (e.g., cloud storage) for production environments.

## Additional Notes or References

*   This documentation assumes the existence of supporting files and configurations (e.g., database connection, authentication middleware).
*   The API endpoints are designed to interact with a MongoDB database through a Mongoose model named `CrimeReport`.
*   The project uses `multer` for handling file uploads, storing uploaded files in a directory accessible via relative paths.
*   The `reportedBy` field on the `CrimeReport` model is populated with user details (`firstname`, `lastname`, `email`, `username`).  Also, `assignedOfficer` is populated.