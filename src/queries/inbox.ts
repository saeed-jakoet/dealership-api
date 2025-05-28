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

export const readInboxMessage = async (id: string, data: {
    status: boolean
}) => {
    try {
        await connectToDatabase();

        const readMessage = await Inbox.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!readMessage) throw new Error('Message not found');

        return readMessage;
    } catch (error) {
        console.error('Error updating Inbox Status:', error);
        throw error;
    }
}