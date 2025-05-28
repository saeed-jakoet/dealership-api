import {Hono} from "hono";
import {getInboxController, postInboxController} from "../controllers/inbox";

const inboxRoutes = new Hono();

inboxRoutes.post("/new", postInboxController);

inboxRoutes.get("/all", getInboxController);

export default inboxRoutes;