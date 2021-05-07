"use strict";

module.exports = (express) => {
  const router = express.Router();
  const jwt = require("jsonwebtoken");
  const config = require("../config");

  //bcrypt
  const bcrypt = require("bcrypt");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const LoginService = require("../services/LoginService");
  const loginService = new LoginService(knex);

  router.post("/buyer", async function (req, res) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      const passwordDB = await loginService.getBuyer(email);
      // console.log(email, passwordDB);
      // console.log(passwordDB.buyer);
      bcrypt.compare(password, passwordDB[0].password, function (err, result) {
        if (result) {
          var payload = {
            id: passwordDB[0].id,
          };
          var token = jwt.sign(payload, config.jwtSecret);

          res.json({
            token: token,
            buyer: passwordDB[0].buyer,
          });
        } else {
          console.log("failed1");
          res.sendStatus(401);
        }
      });
    } else {
      console.log("failed2");
      res.sendStatus(401);
    }
  });

  router.post("/seller", async function (req, res) {
    if (req.body.email) {
      var email = req.body.email;

      const passwordDB = await loginService.getSeller(email);

      if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        const passwordDB = await loginService.getSeller(email);

        bcrypt.compare(
          password,
          passwordDB[0].password,
          function (err, result) {
            if (result) {
              var payload = {
                id: passwordDB[0].id,
              };
              var token = jwt.sign(payload, config.jwtSecret);

              res.json({
                token: token,
              });
            } else {
              console.log("failed1");
              res.sendStatus(401);
            }
          }
        );
      } else {
        console.log("failed2");
        res.sendStatus(401);
      }
    }
  });
  return router;
};
