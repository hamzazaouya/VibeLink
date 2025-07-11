import express, {query, Request, Response} from 'express';
import Logger from "./utils/logger";
import session from './middleware/session';
import dotenv from 'dotenv';
import swapRouter from './routes/swap'

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);

app.use(swapRouter);

app.listen(PORT, () => {
    Logger.user.info(`Swap Server is running on http://localhost:${PORT}`);
});