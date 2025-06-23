import {Hono} from 'hono';
import {logger} from 'hono/logger';
import {cors} from 'hono/cors';

import userRoutes from './routes/auth';
import vehicleRoutes from './routes/vehicles';
import reviewRoutes from './routes/reviews';
import inboxRoutes from './routes/inbox';

const app = new Hono();

app.use(logger());

app.use(
    '/*',
    cors({
        origin: [
            'https://car-dealership-cms-rr67.vercel.app',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003',
        ],
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization'],
    })
);


app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Credentials', 'true');
    // c.header('Access-Control-Allow-Origin', 'https://nimbble-web.vercel.app'); // optionally hardcode origin here if needed
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    await next();
});

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

app.route('/auth', userRoutes);
app.route('/vehicles', vehicleRoutes);
app.route('/reviews', reviewRoutes);
app.route('/inbox', inboxRoutes);

const PORT = process.env.PORT || 3000;

Bun.serve({
    fetch: app.fetch,
    port: Number(PORT),
    hostname: '0.0.0.0',
});

console.log(`🚀 Hono car dealership is running on http://localhost:${PORT}`);
