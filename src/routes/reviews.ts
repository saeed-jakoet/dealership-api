import {Hono} from "hono";
import {fetchReviews, newReviewController} from "../controllers/reviews";

const reviewRoutes = new Hono();

reviewRoutes.post("/new", newReviewController);

reviewRoutes.get("/all", fetchReviews);

export default reviewRoutes;