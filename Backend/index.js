import express from 'express';
import dotenv from 'dotenv';
import connectdb from './Config/db.js';
import authRouter from './Routes/auth.routes.js';
import crimeRouter from './Routes/crime.routes.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(express.json());
app.use(cookieparser());

// CORS middleware must come BEFORE routes
// Build allowed origins list. Prefer explicit CLIENT_URL, but include runtime clientOrigin as a fallback.
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(s => s.trim()).filter(Boolean)
    : [clientOrigin, 'https://crime-record-management-3.onrender.com', 'https://crime-record-management-4.onrender.com'];

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // Allow the request if origin is in the allowed list
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // In non-production, be permissive for convenience
        if (!isProduction) return callback(null, true);
        // Otherwise reject
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Serve uploaded evidence files
app.use('/uploads', express.static(path.join(process.cwd(), 'Backend', 'uploads')));

// Routes
app.use("/api", authRouter);
app.use("/api/crime", crimeRouter);

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    connectdb();
    console.log(`server running on http://localhost:${port}`);
});
