import connectToDatabase from "../utils/mongoose";
import { Review } from "../schema/reviews";

export const addNewReview = async (data: {
  name: string;
  email: string;
  rating: number;
  comment: string;
}) => {
  try {
    await connectToDatabase();
    const newReview = new Review(data);

    const savedReview = await newReview.save();

    return savedReview;
  } catch (error) {
    console.error("Error adding new review:", error);
    throw error;
  }
};

export const fetchAllReviews = async () => {
  try {
    await connectToDatabase();
    const reviews = await Review.find();

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const toggleReviewVisibilityQuery = async (
  id: string,
  hidden: boolean,
) => {
  try {
    await connectToDatabase();
    const review = await Review.findByIdAndUpdate(
      id,
      { hidden },
      { new: true },
    );
    return review;
  } catch (error) {
    console.error("Error toggling review visibility:", error);
    throw error;
  }
};

export const fetchVisibleReviews = async () => {
  try {
    await connectToDatabase();

    // Optimized: Filter at database level + limit results for faster loading
    const visibleReviews = await Review.find({ hidden: { $ne: true } })
      .select("name rating comment createdAt updatedAt")
      .sort({ createdAt: -1 })
      .limit(20) // Limit to 20 most recent reviews for faster loading
      .lean(); // Use lean() for faster queries when we don't need full Mongoose documents

    console.log(
      `Found ${visibleReviews.length} visible reviews (optimized query with limit)`,
    );

    return visibleReviews;
  } catch (error) {
    console.error("Error fetching visible reviews:", error);
    throw error;
  }
};

export const deleteReviewQuery = async (id: string) => {
  try {
    await connectToDatabase();
    const deletedReview = await Review.findByIdAndDelete(id);
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
