module.exports = class CartService {
    constructor(knex) {
        this.knex = knex;
    }

    addItem(itemid) {
        return this.knex('inventory')
        .decrement("total_quantity",1)
        .where('sku',itemid)
        .then(data=>{return data})
    };

    reduceQuantity(itemid){
        return this.knex('inventory')
        .increment("total_quantity",1)
        .where('sku',itemid)
        .then(data=>{return data})

    }


    deleteFromCart(itemid,initQuant){
        return this.knex('inventory')
        .increment('total_quantity',initQuant)
        .where('sku',itemid)
        .then(data=>{return data})

    }
}