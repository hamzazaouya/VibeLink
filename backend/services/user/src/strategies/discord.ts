import passport from 'passport';
import { Strategy as DiscordStrategy} from 'passport-discord';
import { IUser } from '../types/user.interface';
import authDiscord from '../service/discord';
import CONST from '../utils/constants';


passport.serializeUser((user , done) => {
  done(null, user); // Assuming user has an `id` field as the unique identifier
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user: IUser = await authDiscord.getUser(id); 
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: CONST.DISCORD_CALLBACK_URL,
      scope: ['identify', 'email'],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done)=>{
      try {
        const discordId = profile.id;
        if (await authDiscord.isUserExists(discordId)) {
          const user:IUser = await authDiscord.getUser(discordId);
          return done(null, user);
        }
        
        if (!(await authDiscord.isEmailExists(profile.email!))) {
          const user:IUser = await authDiscord.signup(profile.email!, discordId);
          return done(null, user);
        }
        done(null, false, { message: 'Email already exists' });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
