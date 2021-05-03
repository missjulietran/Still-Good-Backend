exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orderDetails")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orderDetails").insert([
        { orders_id: 1, inventory_id: "sku123456", quantity: 3000 },
        { orders_id: 1, inventory_id: "sku654321", quantity: 1000 },
        { orders_id: 2, inventory_id: "sku654321", quantity: 1000 },
        { orders_id: 3, inventory_id: "sku123456", quantity: 5000 },
        { orders_id: 4, inventory_id: "sku123786", quantity: 200 },
        { orders_id: 4, inventory_id: "sku123784", quantity: 5000 },
        { orders_id: 4, inventory_id: "sku123785", quantity: 5000 },
      ]);
    });
};
