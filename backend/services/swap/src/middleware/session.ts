import session from 'express-session';
import { default as RedisStore } from 'connect-redis';
import redisClient from '../database/redisClient';
import dotenv from 'dotenv';
dotenv.config();

const sessionKey = process.env.SESSION_KEY;
if (!sessionKey) {
  console.log("SESSION_KEY environment variable is not set!");
  process.exit(1);
}

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: sessionKey,
  saveUninitialized: false,
  resave: false,
  name: 'sessionID',
  cookie: {
    secure: false, // Set to 'true' in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 30, // 30 minutes
  },
});

export default sessionMiddleware;
