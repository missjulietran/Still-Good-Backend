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
  //   Upload data

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

  router.post("/uploadImage", upload.single("file"), async function (req, res) {
    console.log("Upload image route");
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
      console.log(imgurURL);
    });
    res.json("uploadimg");
  });

  router.post("/upload", function (req, res) {
    console.log("insert");
    console.log(imgurURL);
    return dataService
      .insert(req.body, imgurURL) //USERID
      .then(() => console.log("uploaded data"))
      .catch((err) => res.status(500).json(err));
  });

  return router;
};
