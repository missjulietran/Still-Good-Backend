exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id");
    table.integer("seller_id").unsigned();
    table.foreign("seller_id").references("users.id");
    table.integer("event_id")
    table.foreign("event_id").references("events.id");
    table.specificType("category", "varchar[]");
    table.varchar("sku").unique(); //changed
    table.varchar("name");
    table.integer("units");
    table.integer("total_quantity");
    table.integer("price");
    table.date("best_before_date");
    table.text("descriptions");
    table.varchar("thumbnail");
    table.text("image");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("inventory");
};
