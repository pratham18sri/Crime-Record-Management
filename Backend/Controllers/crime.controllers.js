import CrimeReport from '../models/crime.model.js';
import path from 'path';

// Helpers
const detectFileType = (mimetype) => {
    if (!mimetype) return 'document';
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    return 'document';
};

export const createCrimeReport = async (req, res) => {
    try {
        // If multipart/form-data, frontend sends 'crimeData' JSON and files as 'evidence'
        let payload = req.body;
        if (req.body?.crimeData) {
            try {
                payload = JSON.parse(req.body.crimeData);
            } catch (e) {
                // leave payload as-is
            }
        }

        const {
            title,
            description,
            location,
            incidentDate,
            witnesses,
            suspectInfo
        } = payload;

        const evidence = (req.files || []).map((file) => ({
            type: detectFileType(file.mimetype),
            url: `/uploads/${file.filename}`,
            description: file.originalname
        }));

        const newCrimeReport = new CrimeReport({
            title: title || `${payload.incidentType || 'Crime'} Report`,
            description,
            location,
            incidentDate: incidentDate ? new Date(incidentDate) : Date.now(),
            reportedBy: req.user?._id || null,
            witnesses: witnesses || [],
            evidence,
            status: 'pending'
        });

        const savedReport = await newCrimeReport.save();
        const populated = await savedReport.populate('reportedBy', 'firstname lastname email username');

        res.status(201).json({ success: true, report: populated, message: 'Crime report submitted successfully' });
    } catch (error) {
        console.error('Error creating crime report:', error);
        res.status(500).json({ success: false, message: 'Error submitting crime report', error: error.message });
    }
};

export const getCrimeReports = async (req, res) => {
    try {
        // Reports for the logged in user
        const userId = req.user?._id;
        if (!userId) return res.status(400).json({ success: false, message: 'Invalid user' });

        const reports = await CrimeReport.find({ reportedBy: userId })
            .populate('reportedBy', 'firstname lastname email username')
            .populate('assignedOfficer', 'firstname lastname email username')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, reports });
    } catch (error) {
        console.error('Error fetching crime reports:', error);
        res.status(500).json({ success: false, message: 'Error fetching crime reports', error: error.message });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const reports = await CrimeReport.find({})
            .populate('reportedBy', 'firstname lastname email username')
            .populate('assignedOfficer', 'firstname lastname email username')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, reports });
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ success: false, message: 'Error fetching reports', error: error.message });
    }
};

export const assignOfficer = async (req, res) => {
    try {
        const { id } = req.params;
        const { officerId } = req.body; // optional: assign specific officer
        const assignTo = officerId || req.user?._id;
        if (!assignTo) return res.status(400).json({ success: false, message: 'No officer specified' });

        const report = await CrimeReport.findById(id);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        report.assignedOfficer = assignTo;
        await report.save();

        const populated = await report.populate('assignedOfficer', 'firstname lastname username email');
        res.status(200).json({ success: true, report: populated });
    } catch (error) {
        console.error('Error assigning officer:', error);
        res.status(500).json({ success: false, message: 'Failed to assign officer', error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const valid = ['pending', 'investigating', 'resolved', 'closed'];
        if (!valid.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });

        const report = await CrimeReport.findById(id);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        report.status = status;
        await report.save();
        res.status(200).json({ success: true, report });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, message: 'Failed to update status', error: error.message });
    }
};