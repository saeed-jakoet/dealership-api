import {Hono} from 'hono';
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'

import userRoutes from "./routes/auth";
import vehicleRoutes from "./routes/vehicles";
import reviewRoutes from "./routes/reviews";
import inboxRoutes from "./routes/inbox";

const app = new Hono();

app.use(logger())
app.use('*', cors({
    origin: [
        'http://localhost:3000',
        'https://car-dealership-cms-rr67.vercel.app'
    ],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use("*", async (c, next) => {
    c.header("Access-Control-Allow-Credentials", "true");
    c.header('Access-Control-Allow-Origin', 'https://car-dealership-cms-rr67.vercel.app');
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
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