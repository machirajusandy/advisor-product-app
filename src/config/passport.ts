// config/passport.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Advisor from "../models/Advisor";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Local Strategy for login
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const advisor = await Advisor.findOne({ email });
        if (!advisor) return done(null, false, { message: "Incorrect email." });

        const isMatch = await advisor.comparePassword(password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect password." });

        return done(null, advisor);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT Strategy for protected routes
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const advisor = await Advisor.findById(jwtPayload.id);
        if (!advisor) return done(null, false);
        return done(null, advisor);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
