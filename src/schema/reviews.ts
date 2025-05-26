import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    name: String,
    email: String,
    rating: Number,
    comment: String,
}, {timestamps: true});

export const Review = mongoose.models.Review || mongoose.model('Review', reviewsSchema);