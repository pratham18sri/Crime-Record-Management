# Crime Report Model

## Description

Defines the Mongoose schema for a crime report in a Node.js application. This model encapsulates information about crime incidents, including details about the crime, location, date, reporting user, status, evidence, witnesses, assigned officer, and updates.

## Technologies Used

*   Node.js
*   Mongoose

## Architecture or Code Overview

The `crime.model.js` file defines a Mongoose schema (`crimeReportSchema`) for crime reports.

*   **`title`**: String, required, crime report title.
*   **`description`**: String, required, detailed description of the crime.
*   **`location`**: Object, contains address, city, state, and pincode, all required.
*   **`incidentDate`**: Date, required, the date of the crime incident.
*   **`reportedBy`**: ObjectId, required, references the 'User' model, indicating the user who reported the crime.
*   **`status`**: String, enum with values: 'pending', 'investigating', 'resolved', 'closed'. Defaults to 'pending'.
*   **`evidence`**: Array of objects, each containing:
    *   `type`: String, enum: 'image', 'document', 'video', required.
    *   `url`: String, required, the URL of the evidence file.
    *   `description`: String (optional), describing the evidence.
*   **`witnesses`**: Array of objects, each containing:
    *   `name`: String, witness name.
    *   `contact`: String, witness contact information.
    *   `statement`: String, witness statement.
*   **`assignedOfficer`**: ObjectId, references the 'User' model, the officer assigned to the case.
*   **`updates`**: Array of objects, each containing:
    *   `message`: String, update message.
    *   `updatedBy`: ObjectId, references the 'User' model, the user who made the update.
    *   `timestamp`: Date, defaults to `Date.now`, the time of the update.
*   **`timestamps`**: Enables automatic `createdAt` and `updatedAt` timestamps.

The `CrimeReport` model is then created using `mongoose.model()` and exported for use in other parts of the application.

## Known Issues / Improvements

*   Implement validation to ensure `pincode` is in the correct format.
*   Add more sophisticated validation for URLs.
*   Implement geospatial indexing for location.
*   Consider adding a field for crime type.