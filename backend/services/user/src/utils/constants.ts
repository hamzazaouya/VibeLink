// statusCodes.ts

const SUCCESS: number = 200;
const CREATED: number = 201;
const NO_CONTENT: number = 204;
const BAD_REQUEST: number = 400;
const UNAUTHORIZED: number = 401;
const NOT_FOUND: number = 404;
const NOT_ALLOWED: number = 405;
const CONFLICT: number = 409;
const SERVER_ERROR: number = 500;
const NOT_IMPLEMENTED: number = 501;
const URL: string = "localhost:3000";
const DISCORD_CALLBACK_URL: string = "http://localhost:3000/auth/discord/redirect";
const DISTANCE = 5000

function generateRandomUsername(length = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default { 
    SUCCESS,
    CREATED,
    NO_CONTENT,
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,
    NOT_ALLOWED,
    CONFLICT,
    SERVER_ERROR,
    NOT_IMPLEMENTED,
    URL,
    DISCORD_CALLBACK_URL,
    DISTANCE,
    generateRandomUsername
}
