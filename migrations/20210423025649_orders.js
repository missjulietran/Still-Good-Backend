exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("buyer_id").unsigned();
    table.foreign("buyer_id").references("users.id");
    table.boolean("shipped");
    table.boolean("email_sent");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
