import { sign } from 'hono/jwt'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'jwt-secret'

export const generateToken = async (id: string) => {
    const now = Math.floor(Date.now() / 1000) // Current time in seconds

    const accessToken = await sign(
        {
            sub: id,
            type: 'access',
            exp: now + 604800, // 7 days
        },
        ACCESS_TOKEN_SECRET,
        'HS256'
    )


    return { accessToken }
}