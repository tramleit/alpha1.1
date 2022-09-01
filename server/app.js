const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
var CryptoJS = require("crypto-js");

// var ciphertext = CryptoJS.AES.encrypt(
//   "AlphaCRM1234#",
//   process.env.CRYPTO_SECURITY_KEY
// ).toString();
// console.log("ciphertext: ", ciphertext);
// var bytes  = CryptoJS.AES.decrypt("U2FsdGVkX1+n5tnbeR6Lk1PcmztuCF7rtxdTkglPS14=", 'AlphaSecuritydlkfjwdlkfgj34434');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);
// console.log("originalText: ",originalText);

const { db } = require("./Database/db");

var users = require("./routes/users/users");
var auth = require("./routes/auth/auth");
var customers = require("./routes/customers/customers");
var access = require("./routes/access/access");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const route = express.Router();
app.use("/", route);
app.use("/auth", auth);
app.use("/users", users);
app.use("/customers", customers);
app.use("/access", access);

app.get("/", (req, res) => {
  res.send("Salut coco!!");
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Connected to the port: " + PORT);
});
