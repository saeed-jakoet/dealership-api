import {Hono} from 'hono';
import {logger} from 'hono/logger'

import userRoutes from "./routes/auth";
import vehicleRoutes from "./routes/vehicles";
import reviewRoutes from "./routes/reviews";
import inboxRoutes from "./routes/inbox";

const app = new Hono();

app.use(logger())
app.use('*', async (ctx, next) => {
    const origin = ctx.req.headers.get('Origin') || '*';

    // Set CORS headers on every response
    ctx.headers.set('Access-Control-Allow-Origin', origin);
    ctx.headers.set('Access-Control-Allow-Credentials', 'true');
    ctx.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    ctx.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight OPTIONS request
    if (ctx.req.method === 'OPTIONS') {
        return ctx.text('OK', 200);
    }

    await next();
});


// app.use('*', async (c, next) => {
//   console.log('Request:', c.req.url);
//   await next();
// });
//
// app.use('*', async (c, next) => {
//   const cookie = getCookie(c); // ✅ Parses all cookies
//   console.log('Cookie:', cookie);
//
//   const accessToken = cookie.accessToken;
//   const refreshToken = cookie.refreshToken;
//   (c as any).accessToken = accessToken;
//   (c as any).refreshToken = refreshToken
//
//   console.log('Access Token:', accessToken);
//   console.log('Refresh Token:', refreshToken);
//
//   await next();
// });

// app.use('*', jwtMiddleware) //authenticate all routes

app.get("/health", (c) => c.text("OK"));
app.get('/', (c) => {
    return c.text('\n' +
        '     _                         _\n' +
        '    |_|                       |_|\n' +
        '    | |         /^^^\\         | |\n' +
        '   _| |_      (| "o" |)      _| |_\n' +
        ' _| | | | _    (_---_)    _ | | | |_ \n' +
        '| | | | |\' |    _| |_    | `| | | | |\n' +
        '\\          /   /     \\   \\          /\n' +
        ' \\        /  / /(. .)\\ \\  \\        /\n' +
        '   \\    /  / /  | . |  \\ \\  \\    /\n' +
        '     \\  \\/ /   ||Y||    \\ \\/  /\n' +
        '       \\_/      || ||      \\_/\n' +
        '                () ()\n' +
        '                || ||\n' +
        '               ooO Ooo\n');
});

app.route("/auth", userRoutes);
app.route("/vehicles", vehicleRoutes);
app.route('/reviews', reviewRoutes);
app.route("/inbox", inboxRoutes);


// Set the port (default to 4000 if not specified)
const PORT = process.env.PORT;

Bun.serve({
    fetch: app.fetch,
    port: PORT,
    hostname: "0.0.0.0",
});

console.log(`🚀 Hono car dealership is running on http://localhost:${PORT}`);