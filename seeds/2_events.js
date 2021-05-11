exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
        {
          seller_id: 1,
          title: "NOT LUSH 10% OFF",
          image:
            "https://i.ibb.co/J2G79HY/Lush-Fresh-Handmade-Cosmetics-Company-PRNewsfoto-Lush-Cosmetics.jpg",
          start_date: "2021-07-01T16:49:19.278Z",
          end_date: "2021-08-03T16:49:19.278Z",
        },
        {
          seller_id: 2,
          title: "NOT LAYS 10% OFF",
          image: "https://i.ibb.co/fk4LzFL/Not-Lay-Logo.jpg",
          start_date: "2021-06-04T17:45:19.278Z",
          end_date: "2021-06-30T16:49:19.278Z",
        },
        {
          seller_id: 3,
          title: "NOT ALWAYS 20% OFF",
          image:
            "https://www.fontmirror.com/app_public/files/t/1/featured_image/2021/02/featured_8467.jpg",
          start_date: "2021-07-04T16:49:19.278Z",
          end_date: "2021-08-05T16:49:19.278Z",
        },
      ]);
    });
};
