const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

let nameImg = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/CustomersPics/");
  },
  filename: function (req, file, cb) {
    var tempName = file.originalname
      .replaceAll(/ /g, "-")
      .replaceAll(/:/g, "-");
    nameImg = Date.now() + "-" + tempName;
    cb(null, nameImg);
  },
});

var upload = multer({ storage: storage });

router.post("/create-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `INSERT INTO customers(name, industry, description, website, instagram, facebook, linkedin, twitter, address_country, address_city, address_zip, address_street, address_number, billing_address_country, billing_address_city, billing_address_zip, billing_address_street, billing_address_number, created_by, owner_id, status, mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`;
    let query = db.query(
      sql,
      [
        data.name,
        data.industry,
        data.description,
        data.website,
        data.instagram,
        data.facebook,
        data.linkedin,
        data.twitter,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        id,
        data.owner,
        data.email,
      ],
      function (error, result, fields) {
        if (error) {
          console.log("error create-customer", error);
          return res.send(false);
        }
        return res.send(result);
      }
    );
  });
});

router.post("/upload-customer-pic", upload.single("file"), (req, res) => {
  const newIdCustomer = req.body.newIdCustomer;
  // return res.send(nameImg);
  var imgsrc =
    process.env.FRONT_URL + "/public/Images/CustomersPics/" + req.file.filename;
  // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
  res.send(imgsrc);
});

router.post("/upload-customer-pic-name", (req, res) => {
  const newIdCustomer = req.body.newIdCustomer;
  const imgsrc = req.body.imgsrc;

  var insertData = "UPDATE customers c SET c.photo = ? WHERE c.id = ?";
  db.query(insertData, [imgsrc, newIdCustomer], (err, result) => {
    if (err) throw err;
    res.send(true);
  });
});

router.post("/get-all-customers", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    // const { id } = user;

    let sql = "SELECT * FROM customers c";

    let query = db.query(sql, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.post("/delete-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    // const { id } = user;

    let sql = "DELETE FROM customers WHERE id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.post("/get-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    // const { id } = user;

    let sql = "SELECT * FROM customers WHERE id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.patch("/update-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `UPDATE  customers c SET c.name = ?, c.industry = ?, c.description = ?, c.website = ?, c.instagram = ?, c.facebook = ?, c.linkedin = ?, c.twitter = ?, c.address_country = ?, c.address_city = ?, c.address_zip = ?, c.address_street = ?, c.address_number = ?, c.billing_address_country = ?, c.billing_address_city = ?, c.billing_address_zip = ?, c.billing_address_street = ?, c.billing_address_number = ?, c.created_by = ?, c.owner_id = ?, c.status = 1, c.mail = ? WHERE id = ?`;
    let query = db.query(
      sql,
      [
        data.name,
        data.industry,
        data.description,
        data.website,
        data.instagram,
        data.facebook,
        data.linkedin,
        data.twitter,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        id,
        data.owner,
        data.email,
        data.id,
      ],
      function (error, result, fields) {
        if (error) {
          console.log("error create-customer", error);
          return res.send(false);
        }
        return res.send(result);
      }
    );
  });
});

module.exports = router;
