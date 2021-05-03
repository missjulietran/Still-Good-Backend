"use strict";

module.exports = (express) => {
  const router = express.Router();

  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const DashboardService = require("../services/DashboardService");
  const dashboardService = new DashboardService(knex);
  const DataService = require("../services/DataService");
  const dataService = new DataService(knex);

  router.route("/dashboard/:userId").get(dashboardData);

  function dashboardData(req, res) {
    function getUserLength() {
      return dashboardService
        .getUsersLength()
        .then((data) => {
          return data.length;
        })
        .catch((err) => console.log(err));
    }

    function getStockQuantity() {
      return dashboardService
        .getTotalStock(req.params.userId)
        .then((data) => {
          let sum = 0;
          data.map((x) => (sum += x.total_quantity));
          return sum;
        })
        .catch((err) => console.log(err));
    }

    function getTotalSoldAndRevenue() {
      let sold = 0;
      let revenue = 0;

      return dashboardService
        .getSold(req.params.userId)
        .then((data) => {
          data.map((order) => {
            sold += order.quantity;
            revenue += order.quantity * order.price;
          });
          return [sold, revenue];
        })

        .catch((err) => console.log(err));
    }

    function getTopProduct() {
      let itemCount = {};
      let topItem = { value: 0, key: undefined };
      return dashboardService
        .getSold(req.params.userId)
        .then((data) => {
          data.forEach((order) => {
            if (itemCount[order.inventory_id]) {
              itemCount[order.inventory_id] += order.quantity;
            } else {
              itemCount[order.inventory_id] = order.quantity;
            }

            for (const key in itemCount) {
              if (itemCount[key] > topItem.value) {
                topItem.value = itemCount[key];
                topItem.key = key;
              }
            }
          });

          return topItem.key;
        })
        .then((data) => {
          return dataService
            .getOneItem(data)
            .then((data) => {
              return data[0].name;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    function getTotalOrder() {
      let count = 0;
      let lastItemId = undefined;
      return dashboardService
        .getOrderAmount(req.params.userId)
        .then((data) => {
          data.forEach((item) => {
            if (item.id !== lastItemId) {
              lastItemId = item.id;
              count++;
            }
          });
          return count;
        })
        .catch((err) => console.log(err));
    }

    Promise.all([
      getUserLength(),
      getStockQuantity(),
      getTotalSoldAndRevenue(),
      getTopProduct(),
      getTotalOrder(),
    ]).then(function (results) {
      const userLength = results[0];
      const totalStock = results[1];
      const soldQuantity = results[2][0];
      const totalRevenue = results[2][1];
      const topProduct = results[3];
      const totalOrder = results[4];

      let latestQuantity = totalStock - soldQuantity;

      res.send({
        length: userLength,
        stock: latestQuantity,
        sold: soldQuantity,
        revenue: totalRevenue,
        product: topProduct,
        order: totalOrder,
      });
    });
  }
  return router;
};
