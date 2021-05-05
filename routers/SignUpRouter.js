"use strict";

module.exports = (express) => {
    const router = express.Router();

    const bcrypt = require("bcrypt");
    
    const fileUpload = require("express-fileupload");
    router.use(fileUpload())
    require("dotenv").config();

    const knexConfig = require("../knexfile").development;
    const knex = require("knex")(knexConfig);

    const SignUpService = require("../services/SignUpService");
    const signupService = new SignUpService(knex);
    
    // router.route("/signup").get(signupData);

    // Sign up data 
    router.post('/signup', function (req, res) {
        console.log("signup",req.body)
        console.log(req.files)
        console.log(req.body.password)
        var after

        bcrypt.hash(req.body.password, 5, function (err, hash) {
          after = hash;
        });
        console.log("bcrypt", after)
        //let data= JSON.stringify(req.body);
        //data=JSON.parse(data);
        //console.log(data.businessName)
        return signupService
        .SignUpForm(req.body, req.files, after).then(()=>{console.log('success'); res.send('done')})
        .catch((err) => res.status(500).json(err));
    })
    return router
};