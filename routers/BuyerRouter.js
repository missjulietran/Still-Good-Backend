"use strict";

module.exports = (express) => {
  const router = express.Router();
  const bcrypt = require("bcrypt");

  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const BuyerService = require("../services/BuyerService");
  const buyerService = new BuyerService(knex);

  router.route("/").get(buyerData).put(updateBuyer);
  router.route("/:itemId").get(orderDetail);

  function orderDetail(req, res) {
    return buyerService
      .getOrderDetails(req.params.itemId)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => console.log(err));
  }

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
        .getLatest()
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }

    let sum = 0;
    function latestOrder() {
      return buyerService
        .getRecentOrderId(req.user.id)
        .then((data) => {
          let orderId = data[0].id;

          return buyerService
            .getOrderDetails(orderId)
            .then((data) => {
              data.map((order) => {
                sum += order.quantity * order.price;
              });

              return [data, sum];
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    function allOrderId() {
      return buyerService
        .getAllOrderId(req.user.id)
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }

    Promise.all([getUser(), latestProduct(), latestOrder(), allOrderId()]).then(
      function (results) {
        const buyerData = results[0];
        const latestData = results[1];
        const latestOrderData = results[2][0];
        const latestOrderAmount = results[2][1];
        const allOrderId = results[3];

        res.send({
          buyer: buyerData,
          latest: latestData,
          latestOrder: latestOrderData,
          latestAmount: latestOrderAmount,
          orderId: allOrderId,
        });
      }
    );
  }

  function updateBuyer(req, res) {
    var after;
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      after = hash;

      return buyerService
        .updateBuyerData(req.user.id, req.body, after)
        .then(() => res.status(200).json("updated"))
        .catch((err) => res.status(500).json(err));
    });
  }

  return router;
};
