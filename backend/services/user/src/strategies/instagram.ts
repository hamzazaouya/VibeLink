import passport from 'passport';
import InstagramStrategy from "passport-instagram"
// import authGoogle from '../service/google';
// import { IUser } from '../types/user.interface';
// import { Request } from 'express';
// import { VerifyCallback } from 'passport-google-oauth2';
// import { Profile } from 'passport';

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    // User.findOrCreate({ instagramId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));