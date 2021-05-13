module.exports = (express)=>{
  const router=express.Router();
  const fs= require('fs');
  const path=require('path')
  require("dotenv").config();
  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));
  //Cart cache

  //knex config
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);
  const CartService = require('../services/CartService');
  const cartService = new CartService(knex);

  //Updating DB when adding item to cart
  router.post("/addtocart", (req,res)=>{
      let id=req.body.id
      return cartService.addItem(id)
      .catch((err) => console.log(err));
  });

  //Updating DB when removing quantity from cart
  router.post("/removequantity", (req,res)=>{
    let id=req.body.id
    return cartService.reduceQuantity(id)
    .catch((err) => console.log(err));
  })

  //Updated DB to restore quantity of deleted item
  router.post('/deletefromcart', (req,res)=>{
    let id=req.body.id
    console.log(id)
    let initQuant=req.body.initQuant
    console.log(initQuant)
    return cartService.deleteFromCart(id,initQuant)
    .catch((err) => console.log(err));
  })

  //Writing the JSON file
  router.post("/cartstatechange",(req,res)=>{
   let state=req.body.state;
    fs.writeFile(path.resolve(__dirname,'../data/cart.json'), JSON.stringify(state), {encoding:'utf-8'},(err)=>{
      if(err){
        console.log(err)
      }
    })
})
  //Getting the cart items from JSON file
  router.get('/cartitems',(req,res)=>{
    fs.readFile(path.resolve(__dirname,'../data/cart.json'),'utf-8',(err,data)=>{
      res.send(data)
    })
  })

return router;
}
