import { createLogger, format, transports, Logger } from 'winston';

// Create a logger for user-related logs
const user: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: './traces/user/error.log', level: 'error' }),
        new transports.File({ filename: './traces/user/info.log', level: 'info' })
    ],
});

export default { user };

