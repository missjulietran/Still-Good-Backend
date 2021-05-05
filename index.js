const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const fs = require("fs");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload())

// temporary
const dataRouter = require("./routers/DataRouter")(express);
const dashboardRouter = require("./routers/DashboardRouter")(express);
const loginRouter = require("./routers/LoginRouter")(express);

// Routers
const auth = require("./auth")(knex);
app.use(auth.initialize());

app.use("/login", loginRouter);
app.use("/data", auth.authenticate(), dataRouter);
app.use("/dashboard", auth.authenticate(), dashboardRouter);

//temporary route
app.get("/Categories", (req, res) => {
  fs.readFile(
    __dirname + "/data/sections.json",
    { encoding: "utf-8" },
    (err, data) => {
      let cats = JSON.parse(data);
      res.send(cats.categories);
    }
  );
});

//temporary route
app.get("/Categories", (req, res) => {
  fs.readFile(
    __dirname + "/data/sections.json",
    { encoding: "utf-8" },
    (err, data) => {
      let cats = JSON.parse(data);
      res.send(cats.categories);
    }
  );
});

// Sign up form
app.post("/signup", function (req, res) {
  console.log("another sent");
  console.log(req.body);
  console.log(req.files);
  res.send("yay");
  });

app.listen(8080, () => {
  console.log("running 8080");
});
