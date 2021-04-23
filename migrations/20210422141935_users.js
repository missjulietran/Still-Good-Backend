exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("role");
    table.varchar("name");
    table.varchar("password");
    table.string("tier");
    table.varchar("address_1");
    table.varchar("address_2");
    table.string("city");
    table.string("state");
    table.integer("zip_code");
    table.string("country");
    table.integer("country_code");
    table.integer("phone_no");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
