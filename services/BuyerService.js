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

  getlatest() {
    return this.knex("inventory").select().orderBy("id", "desc").limit(10);
  }
};
