import { Hono } from "hono";
import {
  fetchReviews,
  newReviewController,
  toggleReviewVisibility,
  fetchPublicReviews,
  deleteReviewController,
} from "../controllers/reviews";
import { jwtMiddleware } from "../middleware/authenticateToken";

const reviewRoutes = new Hono();

reviewRoutes.post("/new", jwtMiddleware, newReviewController);

reviewRoutes.get("/all", jwtMiddleware, fetchReviews);

reviewRoutes.get("/public", fetchPublicReviews);

reviewRoutes.put("/:id/visibility", jwtMiddleware, toggleReviewVisibility);

reviewRoutes.delete("/:id", jwtMiddleware, deleteReviewController);

export default reviewRoutes;
