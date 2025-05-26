import connectToDatabase from "../utils/mongoose";
import {Review} from "../schema/reviews";

export const addNewReview = async (data: {
    name: string,
    email: string,
    rating: number,
    comment: string,
}) => {
    try {
        await connectToDatabase();
        const newReview = new Review(data);

        const savedReview = await newReview.save();

        return savedReview;
    } catch (error) {
        console.error('Error adding new review:', error);
        throw error;
    }
}

export const fetchAllReviews = async () => {
    try {
        await connectToDatabase();
        const reviews = await Review.find();

        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};