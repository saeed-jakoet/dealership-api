import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    rating: Number,
    comment: String,
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewsSchema);
