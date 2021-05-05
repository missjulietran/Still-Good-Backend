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

  getBuyer(email) {
    return this.knex("users")
      .select("id", "email", "password")
      .where("email", email)
      .andWhere("buyer", true);
  }
};
