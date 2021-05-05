module.exports = class SignUpService {
  constructor(knex) {
    this.knex = knex;
  }

SignUpForm(data, files) {
  console.log("inserting", data);
  console.log(data.buyer)
return this.knex("users").insert({
  buyer:data.buyer,
  seller:data.seller,
  businessname: data.businessName,
  district : data.district,
  address: data.address,
  name: data.name,
  phone_no: data.phone_no,
  email: data.email,
  password: data.password,
  certfile: files.certFile,
  businesscert: files.businessCert,
})
}
//certFile: files.certFile,
//businessCert: files.businessCert,

// TestInsert(){
// return this.knex("users")
// .insert({
//   name:"Lukas"
// })
// }
}