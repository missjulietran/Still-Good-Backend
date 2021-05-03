exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
        {
          seller_id: 1,
          inventory_id: "sku123456",
          title: "FIRST EVENT",
          image: "https://i.imgur.com/3nZlzdS.jpg",
          start_date: "2021-05-01T16:49:19.278Z",
          end_date: "2021-05-03T16:49:19.278Z",
        },
        {
          seller_id: 1,
          inventory_id: "sku654321",
          title: "SECOND EVENT",
          image: "https://i.imgur.com/3nZlzdS.jpg",
          start_date: "2021-05-01T16:49:19.278Z",
          end_date: "2021-05-03T16:49:19.278Z",
        },
        {
          seller_id: 2,
          inventory_id: "sku123786",
          title: "THIRD EVENT",
          image: "https://i.imgur.com/3nZlzdS.jpg",
          start_date: "2021-05-04T16:49:19.278Z",
          end_date: "2021-05-05T16:49:19.278Z",
        },
      ]);
    });
};
