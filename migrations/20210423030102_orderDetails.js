exports.up = function (knex) {
  return knex.schema.createTable("orderDetails", (table) => {
    table.increments("id");
    table.integer("orders_id").unsigned();
    table.foreign("orders_id").references("orders.id");
    table.varchar("inventory_id").unsigned();
    table.foreign("inventory_id").references("inventory.sku");
    table.integer("quantity");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orderDetails");
};
