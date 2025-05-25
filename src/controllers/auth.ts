import * as bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from "../utils/response";
import { createUser, loginUserQuery } from "../queries/auth";
import {generateToken} from "../utils/generateToken";

export const createUserController = async (c: any) => {
    const { role, email, password } = await c.req.json();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({ role, email, password: hashedPassword });
        return successResponse(user, "User created successfully");
    } catch (error) {
        console.error('Error creating user:', error);
        return errorResponse("User creation failed", 500);
    }
};

export const loginUser = async (c: any) => {
    const { email, password } = await c.req.json();

    try {
        const user = await loginUserQuery(email, password);
        if (!user) return errorResponse("Invalid email or password", 401);


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return errorResponse("Invalid email or password", 401);

        const { accessToken } = await generateToken(user?.id);
        return successResponse({accessToken}, 'Login successful');

    } catch (error) {
        console.error('Error retrieving user:', error);
        return errorResponse("Failed to retrieve user", 500);
    }
};