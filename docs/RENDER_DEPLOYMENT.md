# Render Deployment Guide

This guide will help you deploy the Crime Record Management application to Render.

## Prerequisites

- Render account
- MongoDB database (MongoDB Atlas recommended)
- Git repository

## Backend Deployment

### 1. Create a Web Service on Render

1. Go to your Render dashboard
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `crime-record-management-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd Backend && npm install`
   - **Start Command**: `cd Backend && npm start`
   - **Root Directory**: Leave empty (or set to `Backend` if deploying from root)

### 2. Environment Variables

Add these environment variables in Render dashboard:

```
PORT=10000
NODE_ENV=production
mongoURI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret_key_here
POLICE_ID=2315001656
POLICE_PWD=gla-police
CLIENT_URL=https://crime-record-management-4.onrender.com
```

**Important Notes:**
- `PORT` should be set to `10000` (Render's default) or use `process.env.PORT`
- `mongoURI` should be your MongoDB Atlas connection string
- `JWT_SECRET` should be a strong, random string
- `CLIENT_URL` should match your frontend URL

### 3. Deploy

Click "Create Web Service" and wait for deployment to complete.

## Frontend Deployment

### 1. Create a Static Site on Render

1. Go to your Render dashboard
2. Click "New +" → "Static Site"
3. Connect your Git repository
4. Configure the site:
   - **Name**: `crime-record-management-frontend`
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Publish Directory**: `Frontend/dist`
   - **Root Directory**: Leave empty (or set to `Frontend` if deploying from root)

### 2. Environment Variables

Add this environment variable in Render dashboard:

```
VITE_SERVER_URL=https://your-backend-service.onrender.com
```

Replace `your-backend-service` with your actual backend service URL from Render.

### 3. Deploy

Click "Create Static Site" and wait for deployment to complete.

## Post-Deployment Checklist

- [ ] Backend is accessible at `https://your-backend.onrender.com`
- [ ] Frontend is accessible at `https://crime-record-management-4.onrender.com`
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Database connection is working
- [ ] Cookies are being set correctly (check browser DevTools)
- [ ] Login functionality works
- [ ] File uploads work (if applicable)

## Troubleshooting

### CORS Issues
- Ensure `CLIENT_URL` in backend matches your frontend URL exactly
- Check that `credentials: true` is set in CORS configuration

### Cookie Issues
- Ensure `secure: true` is set in production (handled automatically)
- Ensure `sameSite: "None"` is set in production (handled automatically)
- Check that cookies are being sent with requests (use browser DevTools)

### Database Connection
- Verify MongoDB connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for Render)

### Build Failures
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check build logs for specific errors

## Notes

- Render provides free tier with some limitations
- Static sites on Render have automatic HTTPS
- Backend services may spin down after inactivity (free tier)
- Consider upgrading to paid tier for production use

