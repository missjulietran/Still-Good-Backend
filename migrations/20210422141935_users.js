exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.boolean("buyer");
    table.boolean("seller");
    table.varchar("name");
    table.varchar("email");
    table.varchar("password");
    table.text("address");
    table.string("district");
    table.binary("businesscert");
    table.binary("certfile");
    table.string("businessname");
    table.integer("phone_no");
    table.specificType("cart", "varchar[]");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
