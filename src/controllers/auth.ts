import { successResponse, errorResponse } from "../utils/response";
import { createUser, loginUserQuery } from "../queries/auth";
import { generateToken } from "../utils/generateToken";
import * as bcrypt from "bcryptjs";

export const createUserController = async (c: any) => {
  try {
    const body = await c.req.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      email,
      password: hashedPassword,
      role: role || "user",
    };

    const newUser = await createUser(userData);

    // Generate token for the new user
    const { accessToken } = await generateToken(newUser._id.toString());

    return successResponse(
      {
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        token: accessToken,
      },
      "User created successfully"
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === 11000) {
      return errorResponse("User with this email already exists", 409);
    }
    return errorResponse("Failed to create user", 500);
  }
};

export const loginUser = async (c: any) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const user = await loginUserQuery(email, password);

    // Generate token
    const { accessToken } = await generateToken(user._id.toString());

    console.log(
      {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        token: accessToken,
      },
      "Login successful"
    );

    return successResponse(
      {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        token: accessToken,
      },
      "Login successful"
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return errorResponse("Invalid email or password", 401);
  }
};
