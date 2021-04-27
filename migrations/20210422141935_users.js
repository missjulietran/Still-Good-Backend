exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.boolean("buyer");
    table.boolean("seller");
    table.varchar("name");
    table.varchar("password");
    table.string("tier");
    table.text("address");
    table.string("district");
    table.integer("phone_no");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
