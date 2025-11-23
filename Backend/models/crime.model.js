import mongoose from 'mongoose';

const crimeReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    incidentDate: {
        type: Date,
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'investigating', 'resolved', 'closed'],
        default: 'pending'
    },
    evidence: [{
        type: {
            type: String,
            enum: ['image', 'document', 'video'],
            required: true
        },
        url: {
            type: String,
            required: true
        },
        description: String
    }],
    witnesses: [{
        name: String,
        contact: String,
        statement: String
    }],
    assignedOfficer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updates: [{
        message: String,
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const CrimeReport = mongoose.model('CrimeReport', crimeReportSchema);

export default CrimeReport;