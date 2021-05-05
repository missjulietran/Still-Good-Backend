"use strict";

module.exports = (express) => {
  const router = express.Router();

  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const BuyerService = require("../services/BuyerService");
  const buyerService = new BuyerService(knex);

  router.route("/").get(buyerData);

  function buyerData(req, res) {
    function getUser() {
      return buyerService
        .getBuyer(req.user.id)
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }

    function latestProduct() {
      return buyerService
        .getlatest()
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }

    Promise.all([getUser(), latestProduct()]).then(function (results) {
      const buyerData = results[0];
      const latestData = results[1];
      console.log(latestData);
      res.send({
        buyer: buyerData,
        latest: latestData,
      });
    });
  }

  return router;
};
