import { Strategy } from 'passport-google-oauth20';
import passport from "passport";
import { User } from "../models/User.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config.js";


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    if (user) done(null, user);
});

passport.use(
    new Strategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/oauth2/redirect/google',
        scope: ['identify', 'date_of_birth', 'email', 'profile']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // const { id, username, discriminator, avatar } = profile;
                // const user = await User.findOne({
                //     where: { id },
                //     defaults: { username, discriminator, avatar }
                // });
                const user = await User.findOne({ googleId: profile.id });

                if (user) return done(null, user);

                const newUser = new User({
                    googleId: profile.id,
                    username: profile.username,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value
                    
                });

                const savedUser = await newUser.save();
                done(null, savedUser);
            } catch (error) {
                console.error(error);
                return done(err, null);
            }
        }));