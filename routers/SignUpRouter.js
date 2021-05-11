"use strict";

module.exports = (express) => {
  const router = express.Router();
  // Bcrypt
  const bcrypt = require("bcrypt");
  // Knex
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);
  // Services
  const SignUpService = require("../services/SignUpService");
  const signupService = new SignUpService(knex);

  // const Blob = require("cross-blob");

  // doenv
  require("dotenv").config();

  // ------  Sign up post request ------ //
  router.post("/signup", function (req, res) {
    var after;

    bcrypt.hash(req.body.password, 5, function (err, hash) {
      after = hash;

      return signupService
        .SignUpForm(req.body, req.files, after)
        .then(() => {
          res.send("done");
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  });
  return router;
};
