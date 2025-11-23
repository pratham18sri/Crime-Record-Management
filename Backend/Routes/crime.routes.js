import express from 'express';
import multer from 'multer';
import authenticate, { requirePolice } from '../middleware/auth.middleware.js';
import { createCrimeReport, getCrimeReports, getAllReports, assignOfficer, updateStatus } from '../Controllers/crime.controllers.js';

const router = express.Router();

// configure multer to save uploads to ./uploads
const upload = multer({ dest: './uploads/' });

// Submit a new crime report (supports multipart/form-data with files)
router.post('/report', authenticate, upload.array('evidence'), createCrimeReport);

// Get all crime reports for the logged-in user
router.get('/reports', authenticate, getCrimeReports);

// Police-only routes
router.get('/all', authenticate, requirePolice, getAllReports);
router.put('/:id/assign', authenticate, requirePolice, assignOfficer);
router.put('/:id/status', authenticate, requirePolice, updateStatus);

export default router;