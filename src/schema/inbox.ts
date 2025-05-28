import mongoose from 'mongoose';

const inboxSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    message: String,
    phone: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: Boolean,
})

export const Inbox = mongoose.models.Inbox || mongoose.model('Inbox', inboxSchema);