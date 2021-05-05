const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require("./config");
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (knex) => {
  const strategy = new passportJWT.Strategy(
    {
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = await knex("users").where({ id: payload.id });
      // console.log("user", user);
      if (user[0]) {
        // console.log("user[0] exist");
        return done(null, { id: user[0].id });
      } else {
        // console.log("user[0] not exist");
        return done(new Error("User not found"), null);
      }
    }
  );
  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      console.log("jwt", config.jwtSession);
      return passport.authenticate("jwt", config.jwtSession);
    },
  };
};
