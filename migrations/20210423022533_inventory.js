exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id");
    table.integer("seller_id").unsigned();
    table.foreign("seller_id").references("users.id");
    table.specificType("category", "varchar[]");
    table.varchar("sku");
    table.varchar("name");
    table.integer("quantity");
    table.integer("price");
    table.date("best_before_date");
    table.text("descriptions");
    table.varchar("thumbnail");
    table.varchar("image");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("inventory");
};
