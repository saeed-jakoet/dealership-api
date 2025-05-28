import * as bcrypt from 'bcryptjs';
import connectToDatabase from '../utils/mongoose';
import {User} from '../schema/auth';


export const createUser = async (data: { email: string; role?: string; password: string }) => {
    try {
        // Ensure DB connection is established
        await connectToDatabase();

        // Create a new user document
        const newUser = new User(data);

        // Save the document to the databa  se
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const loginUserQuery = async (email: string, password: string) => {
    try {
        await connectToDatabase();

        const user = await User.findOne({email});

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
};
