import {Hono} from "hono";
import {fetchReviews, newReviewController} from "../controllers/reviews";
import {jwtMiddleware} from "../middleware/authenticateToken";

const reviewRoutes = new Hono();

reviewRoutes.post("/new", jwtMiddleware, newReviewController);

reviewRoutes.get("/all", jwtMiddleware, fetchReviews);

export default reviewRoutes;