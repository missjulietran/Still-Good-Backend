module.exports = class LoginService {
  constructor(knex) {
    this.knex = knex;
  }

  getSeller(email) {
    return this.knex("users")
      .select("id", "email", "password")
      .where("email", email)
      .andWhere("seller", true);
  }

  getBuyer(buyerid) {
    return this.knex("users")
      .select("id", "email", "password")
      .where("id", buyerid)
      .andWhere("buyer", true)
      .then((data) => {
        return data;
      });
  }
};
