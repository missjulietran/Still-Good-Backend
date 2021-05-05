module.exports = class ListingService{
    constructor(knex){
        this.knex=knex;
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

  //Events
  getEvents(){
    return this.knex
    .select(
      "id",
      "seller_id",
      "title",
      "image",
      "start_date",
      "end_date"
    )
    .from("events")
    .then(data=>{return data})
  }
  getEventProducts(event){
    return this.knex
    .select(
      "id",
        "seller_id",
        "event_id",
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
    .where('event_id',event) 
    .then(data=>{return data})
  }

  getEventSeller(id){
    return this.knex
    .select(
      "name"
    )
    .from("users")
    .join("events","users.id","events.seller_id")
    .where("events.id",id)
    .then(data=>{return data})
  }


}