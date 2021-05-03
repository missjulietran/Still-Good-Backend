const express = require("express");
const cors = require("cors");
// const knexConfig = require("./knexfile");
// const knex = require("knex")(knexConfig.development);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// temporary
const dataRouter = require("./routers/DataRouter")(express);

// Routers
app.use("/", dataRouter);

app.listen(8080, () => {
  console.log("running 8080");
});