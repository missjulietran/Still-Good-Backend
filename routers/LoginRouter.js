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

  router.post("/seller", async function (req, res) {
    console.log("seller login route");
    if (req.body.email) {
      var email = req.body.email;
      console.log("check email");
      const passwordDB = await loginService.getSeller(email);
      console.log(email, passwordDB);

      if (passwordDB) {
        var payload = {
          id: passwordDB[0].id,
        };
        var token = jwt.sign(payload, config.jwtSecret);
        console.log("payload", payload);
        console.log("token", token);
        res.json({
          token: token,
        });
      }
      // if (req.body.email && req.body.password) {
      //   var email = req.body.email;
      //   var password = req.body.password;
      //   const passwordDB = await loginService.getSeller(email);
      //   console.log(email, passwordDB);
      //   console.log(passwordDB);
      //   bcrypt.compare(password, passwordDB[0].password, function (err, result) {
      //     console.log("result", result);
      //     if (result) {
      //       var payload = {
      //         id: passwordDB[0].id,
      //       };
      //       var token = jwt.sign(payload, config.jwtSecret);
      //       console.log("payload", payload);
      //       console.log("token", token);
      //       res.json({
      //         token: token,
      //       });
      //     } else {
      //       console.log("failed1");
      //       res.sendStatus(401);
      //     }
      //   });
    } else {
      console.log("failed2");
      res.sendStatus(401);
    }
  });

  return router;
};
