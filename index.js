const express = require("express");
const cors = require("cors");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// temporary
const dataRouter = require("./routers/DataRouter")(express);
const dashboardRouter = require("./routers/DashboardRouter")(express);
const loginRouter = require("./routers/LoginRouter")(express);

// Routers
const auth = require("./auth")(knex);
app.use(auth.initialize());

app.use("/login", loginRouter);
app.use("/", auth.authenticate(), dataRouter);
app.use("/dashboard", auth.authenticate(), dashboardRouter);

app.listen(8080, () => {
  console.log("running 8080");
});
