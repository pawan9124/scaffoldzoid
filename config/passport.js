import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import keys from "./keys.js";
import User from "../models/User.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

const passportConfig = (passport) => {
  console.log("POSSSPODF", passport);
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      console.log("JWT_----------------__", jwt_payload);
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
export default passportConfig;
