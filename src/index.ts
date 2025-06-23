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


app.route("/auth", userRoutes);
app.route("/vehicles", vehicleRoutes);
app.route('/reviews', reviewRoutes);
app.route("/inbox", inboxRoutes);


export default app.fetch;


console.log(`🚀 Hono car dealership is running on http://localhost:${PORT}`);