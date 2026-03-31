import { successResponse, errorResponse } from "../utils/response";
import {
  addNewReview,
  fetchAllReviews,
  toggleReviewVisibilityQuery,
  fetchVisibleReviews,
  deleteReviewQuery,
} from "../queries/reviews";

export const newReviewController = async (c: any) => {
  try {
    const body = await c.req.json();
    const { name, email, rating, comment } = body;

    // Validate required fields
    if (!name || !email || !rating || !comment) {
      return errorResponse(
        "Name, email, rating, and comment are required",
        400,
      );
    }

    // Validate rating is between 1-5
    if (rating < 1 || rating > 5) {
      return errorResponse("Rating must be between 1 and 5", 400);
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse("Invalid email format", 400);
    }

    const reviewData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rating: parseInt(rating),
      comment: comment.trim(),
    };

    const newReview = await addNewReview(reviewData);

    return successResponse(newReview, "Review added successfully");
  } catch (error) {
    console.error("Error adding review:", error);
    return errorResponse("Failed to add review", 500);
  }
};

export const fetchReviews = async () => {
  try {
    const reviews = await fetchAllReviews();
    return successResponse(reviews, "Reviews fetched successfully");
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return errorResponse("Failed to fetch reviews", 500);
  }
};

export const toggleReviewVisibility = async (c: any) => {
  try {
    const id = c.req.param("id");
    const { hidden } = await c.req.json();

    if (!id) return errorResponse("id is required", 400);
    if (typeof hidden !== "boolean")
      return errorResponse("hidden must be a boolean", 400);

    const review = await toggleReviewVisibilityQuery(id, hidden);

    if (!review) return errorResponse("Review not found", 404);

    return successResponse(review, `Review ${hidden ? "hidden" : "visible"}`);
  } catch (error) {
    console.error("Error toggling review visibility:", error);
    return errorResponse("Failed to toggle review visibility", 500);
  }
};

export const fetchPublicReviews = async () => {
  try {
    const reviews = await fetchVisibleReviews();
    return successResponse(reviews, "Public reviews fetched successfully");
  } catch (error) {
    console.error("Error fetching public reviews:", error);
    return errorResponse("Failed to fetch public reviews", 500);
  }
};

export const deleteReviewController = async (c: any) => {
  try {
    const id = c.req.param("id");

    if (!id) {
      return errorResponse("Review ID is required", 400);
    }

    const deletedReview = await deleteReviewQuery(id);

    if (!deletedReview) {
      return errorResponse("Review not found", 404);
    }

    return successResponse(
      { id: deletedReview._id },
      "Review deleted successfully",
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return errorResponse("Failed to delete review", 500);
  }
};
