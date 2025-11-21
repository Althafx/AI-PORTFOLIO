import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: false  // Made optional for backward compatibility
    },
    shortBio: {
        type: String,
        required: false,
        trim: true
    },
    longBio: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    resume: {
        type: String,
        trim: true
    },
    profileImage: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
