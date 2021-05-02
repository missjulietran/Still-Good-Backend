const express = require("express");
const cors = require("cors");
const fs=require('fs');
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

//temporary route
app.get('/Categories',(req,res)=>{
  fs.readFile(__dirname+'/data/sections.json',{encoding:'utf-8'},(err,data)=>{
    let cats=JSON.parse(data)
    res.send(cats.categories)
  })
})

app.listen(8080, () => {
  console.log("running 8080");
});
