import {Context} from 'hono';
import {jwt} from 'hono/jwt';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'jwt-secret';

interface JwtPayload {
    exp?: number;

    [key: string]: any;
}

export const jwtMiddleware = async (c: Context, next: () => Promise<void>) => {
    try {
        const authHeader = c.req.header('Authorization');
        if (!authHeader) return c.json({message: 'Missing or malformed token'}, 401);

        const payload = await jwt({secret: ACCESS_TOKEN_SECRET})(c, next) as JwtPayload;
        if (!payload) return c.json({message: 'Invalid token'}, 401);

        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return c.json({message: 'Token expired'}, 401);
        }

    } catch {
        return c.json({message: 'Unauthorized'}, 401);
    }
};