const express = require("express");
const cors = require("cors");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const fs = require("fs");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());

// temporary
const dataRouter = require("./routers/DataRouter")(express);
const dashboardRouter = require("./routers/DashboardRouter")(express);
const loginRouter = require("./routers/LoginRouter")(express);
const buyerRouter = require("./routers/BuyerRouter")(express);

// Routers
const auth = require("./auth")(knex);
app.use(auth.initialize());

app.use("/login", loginRouter);
app.use("/data", auth.authenticate(), dataRouter);
app.use("/dashboard", auth.authenticate(), dashboardRouter);
app.use("/buyerDashboard", auth.authenticate(), buyerRouter);

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

app.listen(8080, () => {
  console.log("running 8080");
});
