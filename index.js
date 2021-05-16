const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const fileUpload = require("express-fileupload");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);
const app = express();

require("dotenv").config()

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());

// temporary
const dataRouter = require("./routers/DataRouter")(express);
const dashboardRouter = require("./routers/DashboardRouter")(express);
const loginRouter = require("./routers/LoginRouter")(express);
const buyerRouter = require("./routers/BuyerRouter")(express);
const cartRouter = require("./routers/CartRouter")(express);

//stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser");
const { post } = require("request-promise");

const listingRouter = require("./routers/ListingRouter")(express);
const signUpRouter = require("./routers/SignUpRouter")(express);

// Routers
const auth = require("./auth")(knex);
app.use(auth.initialize());

app.use("/", signUpRouter);
app.use("/login", loginRouter);
app.use("/", listingRouter);

app.use("/data", auth.authenticate(), dataRouter);
app.use("/dashboard", auth.authenticate(), dashboardRouter);
app.use("/buyerDashboard", auth.authenticate(), buyerRouter);

app.use("/", cartRouter);


//Stripe line items function
var checkoutInfo;
const lineItems=async()=>{
  var basketInfo=await fs.readFileSync(__dirname+'/data/cart.json','utf-8',(err,data)=>{
    return(data)
  })
  basketInfo=await JSON.parse(basketInfo)
  console.log(basketInfo)
  //Line Items for Stripe
  checkoutInfo=basketInfo.items.map(item=>(
    {
      price_data: {
        currency: 'hkd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price*100,
      },
      quantity: item.quantity,
    }
))
console.log(checkoutInfo)
return
}
//Stripe Routes
app.post('/create-checkout-session',async(req,res)=>{
    await lineItems()
  const session = await stripe.checkout.sessions.create(

    {
    payment_method_types: ['card'],
    line_items: checkoutInfo,
    mode: 'payment',
    success_url: `${process.env.REACT_APP}/buyers/paymentsuccess`,
    cancel_url: `${process.env.REACT_APP}/buyers/paymentcancelled`,
  });
  console.log(session)
  res.json({ id: session.id });
});

// localhost:8080
app.listen(process.env.PORT || 8080, () => {
  console.log("running 8080");
});
