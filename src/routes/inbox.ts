import { Hono } from "hono";
import {
  getInboxController,
  postInboxController,
  readInboxMessageController,
} from "../controllers/inbox";
import { jwtMiddleware } from "../middleware/authenticateToken";
import { limiter } from "../utils/rate-limiter";

const inboxRoutes = new Hono();

inboxRoutes.post("/new", limiter, postInboxController);

inboxRoutes.get("/all", jwtMiddleware, getInboxController);

inboxRoutes.put("/read/:id", jwtMiddleware, readInboxMessageController);

export default inboxRoutes;
