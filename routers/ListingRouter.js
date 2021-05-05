"use strict"

module.exports = (express)=>{
    const router=express.Router();
    const fs = require("fs");
    const path =require('path')
    require("dotenv").config();

    //knex config
    const knexConfig = require("../knexfile").development;
    const knex = require("knex")(knexConfig);

    const ListingService = require('../services/ListingService');
    const listingService = new ListingService(knex)

    //Categories page
  router.get("/Categories", (req,res)=>{
    fs.readFile(
      path.join(__dirname, "../data/sections.json"),
      { encoding: "utf-8" },
      (err, data) => {
            let cats = JSON.parse(data);
            res.send(cats.categories);
      }
    );
  })

    //Route for listing of products for a certain category
  router.get("/category/:products", (req, res) => {
    let cat = req.params.products;
    return listingService.getCategoryProducts(cat).then((data) => {
      res.send(data);
    });
  });

  //Route for product detail page
  router.get("/productpage/:sku", (req, res) => {
    let sku = req.params.sku;
    return listingService.getProducDetails(sku).then((data) => res.send(data));
  });
  //Route for brands page
  router.get("/brands", (req, res) => {
    return listingService.getSeller().then((data) => res.send(data));
  });
  //Route for brands product page
  router.get("/brands/:brand", (req, res) => {
    return listingService
      .getSellerId(req.params.brand)
      .then((seller) => {
        return listingService.getSellerProduct(seller[0].id);
      })
      .then((data) => res.send(data));
  });

  //Events Routes
  router.get("/events", (req, res) => {
    return listingService.getEvents().then((data) => res.send(data));
  });
  router.get("/events/:id", (req, res) => {
    console.log(req.params.id);
    return listingService
      .getEventProducts(req.params.id)
      .then((data) => res.send(data));
  });
  router.get("/eventsellername/:id", (req, res) => {
    let id = req.params.id;
    return listingService.getEventSeller(id).then((data) => res.send(data));
  });
  return router;
}