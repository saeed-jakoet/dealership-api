import { rateLimiter } from "hono-rate-limiter";

export const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 1,
  standardHeaders: "draft-7",
  keyGenerator: (c) =>
    c.req.header("x-forwarded-for") ||
    c.req.header("cf-connecting-ip") ||
    c.req.header("x-real-ip") ||
    "unknown",
});
