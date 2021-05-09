module.exports = class CartService {
    constructor(knex) {
        this.knex = knex;
    }

    PaymentForm(amount, id) {
        console.log("payment", amount);
        console.log("id", id);
        return this.knex("users").insert({
        amount: amount,
        buyer_id: id,
        confirm: true,
    })
    }
}