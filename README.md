# My Project

## Folder Structure

```
├── Backend
│   ├── Controllers
│   │   ├── auth.controllers.js
│   │   ├── crime.controllers.js
│   │   └── user.controllers.js
│   ├── middleware
│   │   └── auth.middleware.js
│   ├── models
│   │   ├── crime.model.js
│   │   └── user.model.js
│   ├── public
│   └── index.js
└── Frontend
    ├── public
    ├── src
    │   ├── Pages
    │   │   ├── Auth
    │   │   │   ├── Login.jsx
    │   │   │   └── SignUp.jsx
    │   │   └── Dashboard
    │   │       ├── Messages.jsx
    │   │       ├── MyCases.jsx
    │   │       ├── PoliceDashboard.jsx
    │   │       ├── ReportCrime.jsx
    │   │       ├── Resources.jsx
    │   │       ├── Settings.jsx
    │   │       └── UserDashboard.jsx
    │   ├── context
    │   │   └── usercontex.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

## Description

This project appears to be a web application with a backend and frontend, potentially related to crime reporting or management based on the file structure. The backend likely handles API endpoints and data management, while the frontend provides the user interface.

## How to Use

### Backend

1.  **Installation:** Navigate to the `Backend` directory and install dependencies (e.g., `npm install` or `yarn install`).
2.  **Running the server:**  Start the server (e.g., `node index.js` or `npm start`).

### Frontend

1.  **Installation:** Navigate to the `Frontend` directory and install dependencies (e.g., `npm install` or `yarn install`).
2.  **Running the application:** Start the development server (e.g., `npm start` or `yarn start`). This will likely open the application in your web browser.

## Technologies Used

*   **Backend:** Node.js, likely using a framework like Express.js.
*   **Frontend:** React.js
*   **Database:** (Likely, not explicitly stated):  A database such as MongoDB, PostgreSQL, or MySQL could be used based on the models.
*   **Languages:** JavaScript (Backend and Frontend)
*   **Other:** HTML, CSS

## Architecture or Code Overview

### Backend

*   **Controllers:**  Handle API request logic (e.g., authentication, crime reporting, user management).  Files: `auth.controllers.js`, `crime.controllers.js`, `user.controllers.js`
*   **Middleware:**  Used for authentication and authorization. File: `auth.middleware.js`
*   **Models:** Define the data structure for users and crimes.  Files: `crime.model.js`, `user.model.js`
*   **index.js:** Main entry point for the backend application, sets up the server and routes.

### Frontend

*   **Pages:**  React components for different views, including authentication and user dashboards.
    *   `Auth`: `Login.jsx`, `SignUp.jsx`
    *   `Dashboard`: `Messages.jsx`, `MyCases.jsx`, `PoliceDashboard.jsx`, `ReportCrime.jsx`, `Resources.jsx`, `Settings.jsx`, `UserDashboard.jsx`
*   **context:** Likely uses Context API for user state management (`usercontex.jsx`).
*   **App.jsx:** The main application component.
*   **main.jsx:** Entry point for the React application.
*   **index.html:**  The HTML file that hosts the React application.

## Known Issues / Improvements

*   No specific issues or improvements are mentioned.
*   Further development is likely needed to connect the frontend and backend.
*   Database integration would need to be implemented.

## Deployment

### Render Deployment

This application is configured for deployment on Render. See `RENDER_DEPLOYMENT.md` for detailed deployment instructions.

**Quick Setup:**

1. **Backend**: Create a Web Service on Render
   - Build Command: `cd Backend && npm install`
   - Start Command: `cd Backend && npm start`
   - Set environment variables (see `RENDER_DEPLOYMENT.md`)

2. **Frontend**: Create a Static Site on Render
   - Build Command: `cd Frontend && npm install && npm run build`
   - Publish Directory: `Frontend/dist`
   - Set `VITE_SERVER_URL` environment variable to your backend URL

**Environment Variables Required:**

Backend:
- `PORT` (default: 10000 for Render)
- `NODE_ENV=production`
- `mongoURI` (MongoDB connection string)
- `JWT_SECRET` (strong secret key)
- `POLICE_ID` (default: 2315001656)
- `POLICE_PWD` (police password)
- `CLIENT_URL` (frontend URL: https://crime-record-management-4.onrender.com)

Frontend:
- `VITE_SERVER_URL` (backend URL)

## Additional Notes or References

*   No specific license or credits were provided.
*   Consider adding more descriptive comments within the source code.
*   For production deployment, see `RENDER_DEPLOYMENT.md`