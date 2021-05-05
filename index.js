const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);



const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload())

// temporary
const dataRouter = require("./routers/DataRouter")(express);
const dashboardRouter = require("./routers/DashboardRouter")(express);
const loginRouter = require("./routers/LoginRouter")(express);

const buyerRouter = require("./routers/BuyerRouter")(express);

const listingRouter=require("./routers/ListingRouter")(express);


// Routers
const auth = require("./auth")(knex);
app.use(auth.initialize());

app.use("/login", loginRouter);

app.use("/", listingRouter)

app.use("/data", auth.authenticate(), dataRouter);
app.use("/dashboard", auth.authenticate(), dashboardRouter);
app.use("/buyerDashboard", auth.authenticate(), buyerRouter);

app.listen(8080, () => {
  console.log("running 8080");
});
