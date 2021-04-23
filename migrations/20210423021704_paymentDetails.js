exports.up = function (knex) {
  return knex.schema.createTable("paymentDetails", (table) => {
    table.increments("id");
    table.integer("buyer_id").unsigned();
    table.foreign("buyer_id").references("users.id");
    table.string("payment_type");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("paymentDetails");
};
