module.exports = class BuyerService {
  constructor(knex) {
    this.knex = knex;
  }

  getBuyer(userid) {
    return this.knex("users")
      .select()
      .where("id", userid)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getLatest() {
    return this.knex("inventory").select().orderBy("id", "desc").limit(5);
  }

  getRecentOrderId(buyerid) {
    return this.knex("orders")
      .select()
      .orderBy("id", "desc")
      .where("buyer_id", buyerid)
      .limit(1)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getOrderDetails(orderid) {
    return this.knex("orderDetails")
      .select()
      .innerJoin("inventory", "inventory.sku", "orderDetails.inventory_id")
      .where("orders_id", orderid);
  }

  getAllOrderId(buyerid) {
    return this.knex("orders")
      .select("")
      .orderBy("id", "desc")
      .where("buyer_id", buyerid)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  updateBuyerData(buyerid, data, files, pw) {
    let userValue = Object.values(data);
    let userKey = Object.keys(data);
    let user = {
      name: data.name,
      email: data.email,
      password: pw,
      address: data.address,
      district: data.district,
      phone_no: data.phone_no,
      businesscert: files.businesscert,
    certfile: files.certfile,
    businessname: data.businessname,
    };
    for (let i = 0; i < userValue.length; i++) {
      if (userValue[i] == "") {
        delete user[userKey[i]];
      }
    }

    return this.knex("users")
      .where("id", buyerid)
      .update(user)
      .then(() => console.log("updated"))
      .catch((err) => console.log(err));
  }
};
