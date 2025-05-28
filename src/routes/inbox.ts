import {Hono} from "hono";
import {getInboxController, postInboxController, readInboxMessageController} from "../controllers/inbox";

const inboxRoutes = new Hono();

inboxRoutes.post("/new", postInboxController);

inboxRoutes.get("/all", getInboxController);

inboxRoutes.put("/read/:id", readInboxMessageController)

export default inboxRoutes;