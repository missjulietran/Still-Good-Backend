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
        "image",
        "descriptions"
      )
      .from("inventory")
      .where("seller_id", userid)
      .then((data) => {
        return data;
      });
  }

  getOneItem(itemid) {
    //USERID
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
        "image",
        "descriptions"
      )
      .from("inventory")
      .where("id", itemid)
      .then((data) => {
        return data;
      });
  }

  insertInventory(userid, data, image) {
    console.log("inserting", data, image);
    return this.knex("inventory").insert({
      seller_id: userid,
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

  updateInventory(itemid, data, image) {
    //USERID
    console.log("updating");
    let items = Object.values(data);
    let itemName = Object.keys(data);
    let inventory = {
      name: data.name,
      category: data.category,
      sku: data.sku,
      total_quantity: data.quantity,
      units: data.units,
      price: data.price,
      best_before_date: data.best_before_date,
      descriptions: data.descriptions,
      image: image,
    };

    for (let i = 0; i < items.length; i++) {
      if (items[i] == "") {
        delete inventory[itemName[i]];
      }
    }
    console.log(inventory);
    return this.knex("inventory")
      .where("id", itemid)
      .update(inventory)
      .then(() => console.log("updated"))
      .catch((err) => console.log(err));
  }
};
