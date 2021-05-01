exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orders")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orders").insert([
        { id: 1, buyer_id: 3 },
        { id: 2, buyer_id: 3 },
        { id: 3, buyer_id: 4 },
        { id: 4, buyer_id: 4 },
        { id: 5, buyer_id: 3 },
      ]);
    });
};
