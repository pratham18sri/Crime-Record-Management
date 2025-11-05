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
app.use(cors({
    origin: "https://crime-record-management-4.onrender.com",
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
