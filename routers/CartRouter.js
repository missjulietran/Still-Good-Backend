"use strict";

// const stripePublicKey = process.env.stripePublicKey;

module.exports = (express) => {
  const router = express.Router();
  const STRIPE_SECRET_TEST = process.env.STRIPE_SECRET_TEST;
  const stripe = require("stripe")(STRIPE_SECRET_TEST);
  // Knex
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);
  //services
  const CartService = require("../services/CartService");
  const cartService = new CartService(knex);

  require("dotenv").config();

  router.post("/cart", function (req, res) {
    console.log("Hellooo backend here");
    return cartService.PaymentForm(req.body).then(() => {
      console.log("Payment", payment);
      // res
      //   .json({
      //     message: "Payment Successful",
      //     success: true,
        })
        .catch((err) => {
          console.log(err);
        //   res.json({ message: "Payment failed", success: false });
        // });
    });
  });
  //     let { amount, id } = req.body;
  //     try {
  //       const payment = await stripe.paymentIntents.create({
  //         amount,
  //         currency: "HKD",
  //         description: "Greener Pricing",
  //         payment_method: id,
  //         confirm: true,
  //       });
  //       console.log("Payment", payment);
  //       res.json({
  //         message: "Payment Successful",
  //         success: true,
  //       });
  //     } catch (error) {
  //       console.log("Error", error);
  //       res.json({ message: "Payment failed", success: false });
  //     }
  //   });
};
