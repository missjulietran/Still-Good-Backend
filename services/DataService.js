module.exports = class DataService {
  constructor(knex) {
    this.knex = knex;
  }

  insert(data, image) {
    console.log("inserting", data, image);
    return this.knex("inventory").insert({
      //USERID
      name: data.name,
      category: data.category,
      sku: data.sku,
      total_quantity: data.quantity,
      units: data.units,
      price: data.price,
      best_before_date: data.best_before_date,
      descriptions: data.descriptions,
      image: image,
    });
  }
  // addImage(image) {
  //   return this.knex("inventory")
  //   .insert({
  //     image: image,
  //   });
  // }
};
