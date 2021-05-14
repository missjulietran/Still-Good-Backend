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

    cartCommit(buyerid,itemid,quantity){
        console.log('inserting to cart', buyerid, itemid, quantity)
        return this.knex('cart')
        .insert({
            buyer_id:buyerid,
            inventory_id:itemid,
            quantity:quantity
        })
        .then(console.log('inserted'))
    }

    getPaymentSuccess(){
        return this.knex('cart')
        .select('*')
        .then(data=>{return data})
    }

    orderCreation(buyerid){
        return this.knex('orders')
        .insert({
            buyer_id:buyerid,
            shipped:'Preparing'
        })
    }

    orderCommit(buyer_id){
       
    }
}