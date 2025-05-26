import {errorResponse, successResponse} from "../utils/response";
import {addNewReview, fetchAllReviews} from "../queries/reviews";

export const newReviewController = async (c: any) => {
    const body = await c.req.json();
    try {
        const review = await addNewReview(body);
        return successResponse(review, "Review added successfully");
    } catch (error) {
        console.error("Error adding review:", error);
        return errorResponse("Failed to add review", 500);
    }
}

export const fetchReviews = async (c: any) => {
    try {
        const reviews = await fetchAllReviews();
        return successResponse(reviews, "Reviews fetched successfully");
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return errorResponse("Failed to fetch reviews", 500);
    }
}