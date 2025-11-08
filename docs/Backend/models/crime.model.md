# Crime Report Model

## Folder Structure

_No file structure available._

## Description

This project defines the Mongoose schema for a crime report. It outlines the structure for storing crime-related information, including details about the incident, location, involved parties, evidence, and status updates.

## How to Use

This is a Mongoose schema definition and is intended to be used within a Node.js application that uses MongoDB.

1.  **Installation:**

    Ensure you have Node.js and MongoDB installed and a Mongoose connection established in your project.

2.  **Usage:**

    ```javascript
    import CrimeReport from './crime.model.js';

    // Create a new crime report
    const newReport = new CrimeReport({
        title: 'Theft',
        description: 'Wallet stolen from pocket',
        location: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            pincode: '91234'
        },
        incidentDate: new Date(),
        reportedBy: '654321098765432109876543', // User ID
        evidence: [{ type: 'image', url: 'image.jpg', description: 'Photo of the scene' }]
    });

    // Save the report
    newReport.save()
        .then(report => console.log(report))
        .catch(err => console.error(err));
    ```

## Technologies Used

*   JavaScript (ES6+)
*   Node.js
*   Mongoose
*   MongoDB

## Architecture or Code Overview

The `crime.model.js` file exports a Mongoose model named `CrimeReport`.

*   **Schema Definition:** Defines the structure for each crime report, including fields for:
    *   `title`: Crime title.
    *   `description`: Description of the crime.
    *   `location`:  Address, city, state, and pincode.
    *   `incidentDate`: Date of the incident.
    *   `reportedBy`:  Reference to a `User` model (ObjectId).
    *   `status`:  Crime report status (pending, investigating, resolved, closed).
    *   `evidence`: Array of evidence objects (type, url, description).
    *   `witnesses`: Array of witness objects (name, contact, statement).
    *   `assignedOfficer`: Reference to a `User` model (ObjectId).
    *   `updates`: Array of updates (message, updatedBy, timestamp).
*   **Timestamps:** Includes `createdAt` and `updatedAt` timestamps.

## Known Issues / Improvements

*   **Validation:** More robust data validation (e.g., for phone numbers, URLs, and date formats) could be added.
*   **Indexing:** Consider adding indexes to frequently queried fields for performance optimization.
*   **Error Handling:** Implement error handling within the save and update operations.

## Additional Notes or References

*   This schema is designed to be used in conjunction with a `User` model (referenced in `reportedBy`, `assignedOfficer`, and `updates.updatedBy`).
*   This schema defines the structure for storing crime reports; the application logic for creating, updating, and querying these reports needs to be implemented separately.