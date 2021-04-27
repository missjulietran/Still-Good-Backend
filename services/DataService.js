module.exports = class DataService {
  constructor(knex) {
    this.knex = knex;
  }

  insert(data) {
    console.log("inserting", data);
    return this.knex("inventory").insert([
      {
        name: data.name,
        category: data.category,
        sku: data.sku,
        total_quantity: data.quantity,
        units: data.units,
        price: data.price,
        best_before_date: data.best_before_date,
        descriptions: data.descriptions,
        image: data.image,
      },
    ]);
  }
  // addImage(image) {
  //   return this.knex("inventory").insert([
  //     {
  //       image: image,
  //     },
  //   ]);
  // }
};
