exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("inventory")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("inventory").insert([
        {
          category: ["Asian", "Snacks"],
          sku: "sku123456",
          name: "Sample",
          units: 100,
          total_quantity: 1000,
          price: 20,
          best_before_date: "2021-05-01T16:49:19.278Z",
          descriptions: "testing",
          image: "https://i.imgur.com/3nZlzdS.jpg",
        },
      ]);
    });
};
