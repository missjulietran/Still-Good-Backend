exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("inventory")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("inventory").insert([
        {
          seller_id: 1,
          name: "sample",
          category: ["Asian", "Snacks"],
          sku: "sku123456",
          units: 100,
          total_quantity: 1000,
          price: 20,
          image: "https://i.imgur.com/3nZlzdS.jpg",
          best_before_date: "2021-05-01T16:49:19.278Z",
          descriptions: "test",
        },
        {
          seller_id: 1,
          name: "sample",
          category: ["Western", "Snacks"],
          sku: "sku654321",
          units: 100,
          total_quantity: 2000,
          price: 30,
          image: "https://i.imgur.com/3nZlzdS.jpg",
          best_before_date: "2021-05-02T16:49:19.278Z",
          descriptions: "testtest",
        },
        {
          seller_id: 2,
          name: "sample",
          category: ["Asian", "Skincare"],
          sku: "sku123786",
          units: 100,
          total_quantity: 5000,
          price: 20,
          image: "https://i.imgur.com/3nZlzdS.jpg",
          best_before_date: "2021-05-01T16:49:19.278Z",
          descriptions: "testtesttest",
        },
      ]);
    });
};
