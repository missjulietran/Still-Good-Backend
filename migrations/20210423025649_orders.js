exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("buyer_id").unsigned();
    table.foreign("buyer_id").references("users.id");
    table.string("shipped");
    table.boolean("email_sent");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
