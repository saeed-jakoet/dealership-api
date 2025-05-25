import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    password: { type: String, required: true },
});

// Create a model
export const User = mongoose.models.User || mongoose.model('User', UserSchema);