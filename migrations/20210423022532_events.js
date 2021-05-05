exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id");
    table.integer("seller_id").unsigned();
    table.foreign("seller_id").references("users.id");
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

// 20210423024756_events.js

// 20210423022532_events.js
