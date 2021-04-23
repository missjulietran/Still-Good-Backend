const express = require("express");

module.exports = class LinkRouter {
  constructor(linkService) {
    this.linkService = linkService;
  }

  router() {
    let router = express.Router();
    console.log("router start");
    return router;
  }
};
