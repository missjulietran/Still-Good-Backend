exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orderDetails")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orderDetails").insert([
        { orders_id: 1, inventory_id: "lush1", quantity: 3000 },
        { orders_id: 1, inventory_id: "pocari2", quantity: 1000 },
        { orders_id: 2, inventory_id: "lush4", quantity: 1000 },
        { orders_id: 3, inventory_id: "Pringles3", quantity: 5000 },
        { orders_id: 4, inventory_id: "pringles1", quantity: 200 },
        { orders_id: 4, inventory_id: "Always2", quantity: 5000 },
        { orders_id: 4, inventory_id: "Always1", quantity: 5000 },
      ]);
    });
};
