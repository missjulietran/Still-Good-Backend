"use strict";

module.exports = (express) => {
  const router = express.Router();
  const multer = require("multer");
  var rp = require("request-promise");
  //   const fs = require("fs");
  //   const axios = require("axios");
  require("dotenv").config();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const DataService = require("../services/DataService");
  const dataService = new DataService(knex);

  //   Upload Image
  var upload = multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Allowed only .png"));
      }
    },
  });
  var imgurURL;

  router.get("/getInventoryData/:userId", function (req, res) {
    console.log("getting data backend");
    return dataService
      .getInventoryData(req.params.userId) //USERID
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.status(500).json(err));
  });

  router.post("/uploadImage", upload.single("file"), async function (req, res) {
    // console.log("Upload image route");
    const encode_image = req.file.buffer.toString("base64");
    var options = {
      method: "POST",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
      formData: {
        image: encode_image,
      },
    };

    await rp(options, function (error, response) {
      if (error) throw new Error(error);
      var imageURL = response.body;
      imgurURL = JSON.parse(imageURL).data.link;
      // console.log(imgurURL);
    });
    res.json("uploadimg");
  });

  //Uploda data
  router.post("/upload/:userId", function (req, res) {
    return dataService
      .insertInventory(req.params.userId, req.body, imgurURL) //USERID
      .then(() => res.status(200).json("updated"))
      .catch((err) => res.status(500).json(err));
  });

  router.post("/uploadEvent/:userId", function (req, res) {
    return dataService
      .insertEvent(req.params.userId, req.body, imgurURL) //USERID
      .then(() => console.log("uploaded data"))
      .catch((err) => res.status(500).json(err));
  });

  //Update data
  router.get("/singleProduct/:itemId", function (req, res) {
    return dataService
      .getOneItem(req.params.itemId)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).json(err));
  });

  router.put("/update/:itemId", function (req, res) {
    console.log("putting", imgurURL);

    return dataService
      .updateInventory(req.params.itemId, req.body, imgurURL)
      .then(() => res.status(200).json("updated"))
      .catch((err) => res.status(500).json(err));
  });
  return router;
};
