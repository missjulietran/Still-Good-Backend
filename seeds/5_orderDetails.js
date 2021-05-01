exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orderDetails")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orderDetails").insert([
        { id: 1, orders_id: 1, inventory_id: 1, quantity: 3000 },
        { id: 2, orders_id: 1, inventory_id: 2, quantity: 1000 },
        { id: 3, orders_id: 2, inventory_id: 2, quantity: 1000 },
        { id: 4, orders_id: 3, inventory_id: 1, quantity: 5000 },
        { id: 5, orders_id: 4, inventory_id: 3, quantity: 200 },
        { id: 6, orders_id: 4, inventory_id: 4, quantity: 5000 },
        { id: 7, orders_id: 4, inventory_id: 5, quantity: 5000 },
      ]);
    });
};
