import {Context} from 'hono';
import {verify} from 'hono/jwt';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'jwt-secret';

console.log('JWT Secret loaded:', ACCESS_TOKEN_SECRET ? 'Yes (length: ' + ACCESS_TOKEN_SECRET.length + ')' : 'No');

interface JwtPayload {
    exp?: number;

    [key: string]: any;
}

export const jwtMiddleware = async (c: Context, next: () => Promise<void>) => {
    try {
        const authHeader = c.req.header('Authorization');
        console.log('Auth header present:', !!authHeader);
        if (!authHeader) return c.json({message: 'Missing or malformed token'}, 401);

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;

        const payload = await verify(token, ACCESS_TOKEN_SECRET, 'HS256') as JwtPayload;
        if (!payload) return c.json({message: 'Invalid token'}, 401);

        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return c.json({message: 'Token expired'}, 401);
        }

        // Store payload on context for downstream handlers
        c.set('jwtPayload', payload);

        // Continue to the route handler
        await next();

    } catch (error) {
        console.log('JWT verification error:', error);
        return c.json({message: 'Unauthorized'}, 401);
    }
};