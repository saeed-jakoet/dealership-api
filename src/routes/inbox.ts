import {Hono} from "hono";
import {getInboxController, postInboxController, readInboxMessageController} from "../controllers/inbox";
import {jwtMiddleware} from "../middleware/authenticateToken";

const inboxRoutes = new Hono();

inboxRoutes.post("/new", jwtMiddleware, postInboxController);

inboxRoutes.get("/all", jwtMiddleware, getInboxController);

inboxRoutes.put("/read/:id", jwtMiddleware, readInboxMessageController)

export default inboxRoutes;