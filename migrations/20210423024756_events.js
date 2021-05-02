exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    // table.increments("id");
    table.integer("seller_id").unsigned();
    table.foreign("seller_id").references("users.id");
    table.varchar("inventory_id").unsigned();
    table.foreign("inventory_id").references("inventory.sku");
    table.varchar("title");
    table.text("image");
    table.date("start_date");
    table.date("end_date");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
