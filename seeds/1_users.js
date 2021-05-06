exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          seller: true,
          name: "NotLush",
          email: "NotLush@test.com",
          password:
            "$2b$05$bNXEaWJovE9O.6GQQpT39ecgN8y5YwoK342sDbFjnQGXTZgQjCq4W",
          address: "3 Flush Road, Central, Hong Kong",
          district: "Central and Western",
          phone_no: 123456789,
        },
        {
          seller: true,
          name: "NotPringles",
          email: "NotPringles@test.com",
          address: "12 Crispy Path, Mong Kok, Hong Kong",
          district: "Yau Tsim Mong",
          phone_no: 123456789,
        },
        {
          seller: true,
          name: "NotAlways",
          email: "NotAlways@test.com",
          address: "87 Never Lane, Kwun Tong, Hong Kong",
          district: "Kwun Tong",
          phone_no: 123456789,
        },
        {
          seller: true,
          name: "NotPocari",
          email: "NotPocari@test.com",
          address: "Sports Street, Shaukeiwan, Hong Kong",
          district: "Eastern",
          phone_no: 123456789,
        },
        {
          seller: true,
          name: "NotKelloggs",
          email: "NotKelloggs@test.com",
          address: "60 Morning Lane, Tsuen Wan, Hong Kong",
          district: "Tsuen Wan",
          phone_no: 123456789,
        },
        {
          buyer: true,
          email: "test3@test.com",
          password:
            "$2b$05$bNXEaWJovE9O.6GQQpT39ecgN8y5YwoK342sDbFjnQGXTZgQjCq4W",
          address: "The Point",
          district: "Yau Tsim Mong",
          phone_no: 123456789,
        },
        { buyer: true, email: "test4@test.com" },
      ]);
    });
};
