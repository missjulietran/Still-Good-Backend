exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { seller: true, email: "test@test.com" },
        { seller: true, email: "test2@test.com" },
        { buyer: true, email: "test3@test.com" },
      ]);
    });
};
