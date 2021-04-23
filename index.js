const express = require("express");
const cors = require("cors");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// temporary
const DataService = require("./services/DataService");
const DataRouter = require("./routers/DataRouter");
const dataSerive = new DataService(knex);

app.use("/", new DataRouter(dataSerive).router());

app.listen(8080, () => {
  console.log("running 8080");
});
