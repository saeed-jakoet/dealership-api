import connectToDatabase from "../utils/mongoose";
import {Inbox} from "../schema/inbox";


export const postInboxQuery = async (data: {
    name: string;
    email: string;
    lastName: string;
    message: string;
    phone: string;
    status: boolean;
}) => {
    try {
        await connectToDatabase();
        const inboxMessage = new Inbox(data);
        const savedMessage = await inboxMessage.save();
        return savedMessage;
    } catch (error) {
        console.error('Error saving inbox message:', error);
        throw error;
    }
};

export const getInboxQuery = async () => {
    try {
        await connectToDatabase();
        const inboxMessages = await Inbox.find().sort({createdAt: -1});
        return inboxMessages;
    } catch (error) {
        console.error('Error retrieving inbox messages:', error);
        throw error;
    }
};