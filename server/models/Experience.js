import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['work', 'education'],
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    organization: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    achievements: [{
        type: String
    }],
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
