import {getInboxQuery, postInboxQuery} from "../queries/inbox";
import {errorResponse, successResponse} from "../utils/response";

export const postInboxController = async (c: any) => {
    const body = await c.req.json();

    try {
        const inboxMessage = await postInboxQuery(body);
        return successResponse(inboxMessage, "Message sent successfully");
    } catch (error) {
        console.error('Error saving inbox message:', error);
        return errorResponse("Failed to send message", 500);
    }
};

export const getInboxController = async (c: any) => {
    try {
        const inboxMessages = await getInboxQuery();
        return successResponse(inboxMessages, "Inbox messages retrieved successfully");
    } catch (error) {
        console.error('Error retrieving inbox messages:', error);
        return errorResponse("Failed to retrieve inbox messages", 500);
    }
};