import {Hono} from 'hono';
import {logger} from 'hono/logger'

import userRoutes from "./routes/auth";
import vehicleRoutes from "./routes/vehicles";
import reviewRoutes from "./routes/reviews";
import inboxRoutes from "./routes/inbox";

const app = new Hono();

app.use(logger())

app.options('*', (c) => {
    const origin = c.req.header('Origin');
    if (origin && allowedOrigins.includes(origin)) {
        c.header('Access-Control-Allow-Origin', origin);
    }
    c.header('Access-Control-Allow-Credentials', 'true');
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return c.text('', 204);
});


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