import googleDAO from '../database/google';
import { IUser } from '../types/user.interface';

async function isUserExists(google_id: string): Promise<boolean> {
    return await googleDAO.isGoogleIdExists(google_id);
}

async function getUser(google_id: string): Promise<IUser> {
    const user: IUser = await googleDAO.getUser(google_id);
    return user;
}

async function isUserNameExists(username: string): Promise<boolean> {
    return googleDAO.isUserNameExists(username);
}

async function signup(username: string, discord_id: string): Promise<IUser> {
    return await googleDAO.signup(username, discord_id);
}

export default {isUserExists, getUser, isUserNameExists, signup}