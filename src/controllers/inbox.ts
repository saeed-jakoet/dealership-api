import { successResponse, errorResponse } from "../utils/response";
import { postInboxQuery, getInboxQuery, readInboxMessage } from "../queries/inbox";

export const postInboxController = async (c: any) => {
    try {
        const body = await c.req.json();
        const { name, email, lastName, message, phone } = body;

        // Validate required fields
        if (!name || !email || !lastName || !message) {
            return errorResponse("Name, email, lastName, and message are required", 400);
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse("Invalid email format", 400);
        }

        // Validate phone format if provided
        if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
            return errorResponse("Invalid phone number format", 400);
        }

        const inboxData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            lastName: lastName.trim(),
            message: message.trim(),
            phone: phone ? phone.trim() : '',
            status: false // Default to unread
        };

        const newMessage = await postInboxQuery(inboxData);

        return successResponse(newMessage, "Message sent successfully");

    } catch (error) {
        console.error("Error posting inbox message:", error);
        return errorResponse("Failed to send message", 500);
    }
};

export const getInboxController = async () => {
    try {
        const messages = await getInboxQuery();
        return successResponse(messages, "Inbox messages fetched successfully");
    } catch (error) {
        console.error("Error fetching inbox messages:", error);
        return errorResponse("Failed to fetch messages", 500);
    }
};

export const readInboxMessageController = async (c: any) => {
    try {
        const { id } = c.req.param();
        const body = await c.req.json();
        const { status } = body;

        if (typeof status !== 'boolean') {
            return errorResponse("Status must be a boolean value", 400);
        }

        const updatedMessage = await readInboxMessage(id, { status });

        return successResponse(updatedMessage, "Message status updated successfully");

    } catch (error: any) {
        console.error("Error updating message status:", error);
        if (error.message === 'Message not found') {
            return errorResponse("Message not found", 404);
        }
        return errorResponse("Failed to update message status", 500);
    }
};
