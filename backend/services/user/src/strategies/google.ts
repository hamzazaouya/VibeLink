import passport from 'passport';
import  {Strategy as GoogleStrategy} from 'passport-google-oauth2';
import authGoogle from '../service/google';
import { IUser } from '../types/user.interface';
import { Request } from 'express';
import { VerifyCallback } from 'passport-google-oauth2';
import { Profile } from 'passport';

passport.use('google', new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
  },
  async (request: Request, accessToken: string, refreshToken: string, profile:Profile, done: VerifyCallback) => {
    try {
        if(await authGoogle.isUserExists(profile.id)) {
            const user:IUser = await authGoogle.getUser(profile.id);
            return done(null, user);
        } 
        const rawUsername: string = ` ${profile.name?.givenName}}`;
        const username = rawUsername.toLocaleLowerCase().replace(/[^a-z0-9_]/g, '')
        if (!await authGoogle.isUserNameExists(username)) {
            const user:IUser = await authGoogle.signup(username, profile.id);
            return done(null, user);
        }
        done(null, false, { message: 'username already exists' });
    }catch(error) {
        return done(error, false);
    }
  }
));