exports.up = function (knex) {
  return knex.schema.createTable("orderDetails", (table) => {
    table.increments("id");
    table.integer("orders_id").unsigned();
    table.foreign("orders_id").references("orders.id");
    table.integer("inventory_id").unsigned();
    table.foreign("inventory_id").references("inventory.id");
    table.integer("quantity");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orderDetails");
};
