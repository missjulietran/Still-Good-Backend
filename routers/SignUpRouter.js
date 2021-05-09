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
    console.log("signup", req.body);
    console.log("files:", req.files);
    // console.log(req.body.password);
    // console.log(req.body.address)

    var after;

    bcrypt.hash(req.body.password, 5, function (err, hash) {
      after = hash;

      return signupService
        .SignUpForm(req.body, req.files, after)
        .then(() => {
          console.log("success");
          res.send("done");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  });
  return router;
};
