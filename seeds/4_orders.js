exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orders")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orders").insert([
        { id: 1, buyer_id: 6, shipped: "Shipped" },
        { id: 2, buyer_id: 6, shipped: "Shipped" },
        { id: 3, buyer_id: 7, shipped: "Shipped" },
        { id: 4, buyer_id: 7, shipped: "Shipped" },
        { id: 5, buyer_id: 6, shipped: "Preparing" },
      ]);
    });
};
