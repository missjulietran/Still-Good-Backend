exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
        {
          seller_id: 1,
          title: "FIRST EVENT",
          image: "https://i.imgur.com/3nZlzdS.jpg",
          start_date: "2021-07-01T16:49:19.278Z",
          end_date: "2021-08-03T16:49:19.278Z",
        },
        {
          seller_id: 1,
          title: "SECOND EVENT",
          image: "https://i.imgur.com/3nZlzdS.jpg",
          start_date: "2021-05-04T17:45:19.278Z",
          end_date: "2021-08-03T16:49:19.278Z",
        },
        {
          seller_id: 2,
          title: "THIRD EVENT",
          image: "https://i.imgur.com/3nZlzdS.jpg",
          start_date: "2021-07-04T16:49:19.278Z",
          end_date: "2021-08-05T16:49:19.278Z",
        },
      ]);
    });
};
