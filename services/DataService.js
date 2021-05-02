module.exports = class DataService {
  constructor(knex) {
    this.knex = knex;
  }

  getInventoryData(userid) {
    return this.knex
      .select(
        "id",
        "seller_id",
        "category",
        "sku",
        "name",
        "units",
        "total_quantity",
        "price",
        "best_before_date",
        "image"
      )
      .from("inventory")
      .where("seller_id", userid)
      .then((data) => {
        return data;
      });
  }

  //Method to grab product based on matching category
  getCategoryProducts(cat){
    return this.knex
      .select(
        "id",
        "seller_id",
        "category",
        "sku",
        "name",
        "units",
        "total_quantity",
        "price",
        "best_before_date",
        "image"
      )
      .from("inventory")
      .whereRaw('? = any (??)', [cat, 'category'])
      .then((data) => {
        return(data);
      });
  }

  //Methoud to grab product based on SKU.

  getProducDetails(sku){
    return this.knex
    .select(
      "id",
        "seller_id",
        "category",
        "sku",
        "name",
        "units",
        "total_quantity",
        "price",
        "best_before_date",
        "image"
    )
    .from("inventory")
    .where('sku',sku)
    .then((data) => {
      return(data);
    });
  }
  insertInventory(data, image) {
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

  insertEvent(data, image) {
    console.log("event inserting", data, image);
    return this.knex("events").insert({
      // USERID
      image: image,
      start_date: data.start,
      end_date: data.end,
    });
  }
};
