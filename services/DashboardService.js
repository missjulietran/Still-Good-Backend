module.exports = class DashboardService {
  constructor(knex) {
    this.knex = knex;
  }

  getUsersLength() {
    return this.knex("users")
      .select("id")
      .where("buyer", true)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getTotalStock(sellerid) {
    return this.knex("inventory")
      .select("total_quantity", "price")
      .where("seller_id", sellerid)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getSold(sellerid) {
    return this.knex("orderDetails")
      .select(
        "orderDetails.orders_id",
        "orderDetails.inventory_id",
        "orderDetails.quantity",
        "inventory.total_quantity",
        "inventory.price",
        "inventory.name"
      )
      .innerJoin("inventory", "orderDetails.inventory_id", "inventory.sku")
      .where("inventory.seller_id", sellerid)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getOrderAmount(sellerid) {
    return this.knex("orderDetails")
      .select("orders.id")
      .innerJoin("orders", "orderDetails.orders_id", "orders.id")
      .innerJoin("inventory", "orderDetails.inventory_id", "inventory.sku")
      .where("inventory.seller_id", sellerid)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }
};
