import {Hono} from "hono";
import {createUserController, loginUser} from "../controllers/auth";

const userRoutes = new Hono();

userRoutes.post("/register", createUserController);

userRoutes.post('/login', loginUser)

export default userRoutes;