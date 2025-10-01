import session from 'express-session';
import { default as RedisStore } from 'connect-redis';
import redisClient from '../utils/redisClient';

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
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    domain: 'localhost',
    path: '/',
  },
});

export default sessionMiddleware;
