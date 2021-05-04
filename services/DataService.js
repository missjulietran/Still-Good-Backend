module.exports = class DataService {
  constructor(knex) {
    this.knex = knex;
  }

  // Inventory
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
      .where("sku", itemid)
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

  //Methods to get Sellers/Brands list
  getSeller(){
    return this.knex
    .select("name")
    .from("users")
    .where('seller',true)
    .then(data=>{return(data)})
  }
  getSellerId(name){
    return this.knex
    .select("id")
    .from("users")
    .where('name',name)
    .then(data=>{return(data)})
  }
  //Method to get Products from a brand
  getSellerProduct(seller){
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
    .from('inventory')
    .where("seller_id",seller)
    .then(data=>{return data})
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

  updateInventory(itemid, data, image) {
    //USERID
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
      .where("sku", itemid)
      .update(inventory)
      .then(() => console.log("updated"))
      .catch((err) => console.log(err));
  }

  delInventory(itemid) {
    return this.knex("inventory")
      .where("sku", itemid)
      .del()
      .catch((err) => console(err));
  }

  // Event
  insertEvent(userid, data, image) {
    return this.knex("events").insert({
      // USERID
      seller_id: userid,
      title: data.title,
      image: image,
      start_date: data.start,
      end_date: data.end,
    });
  }

  // User
  getUser(userid) {
    return this.knex("users")
      .select(
        "id",
        "name",
        "password",
        "email",
        "address",
        "district",
        "tier",
        "phone_no"
      )
      .where("id", userid)
      .andWhere("seller", true)
      .then((data) => {
        return data;
      });
  }
  updateUser(userid, data, pw) {
    let userValue = Object.values(data);
    let userKey = Object.keys(data);
    let user = {
      name: data.name,
      email: data.email,
      password: pw,
      address: data.address,
      district: data.district,
      phone_no: data.phone_no,
    };
    for (let i = 0; i < userValue.length; i++) {
      if (userValue[i] == "") {
        delete user[userKey[i]];
      }
    }

    return this.knex("users")
      .where("id", userid)
      .update(user)
      .then(() => console.log("updated"))
      .catch((err) => console.log(err));
  }
};
