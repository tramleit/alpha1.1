const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
var CryptoJS = require("crypto-js");

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

let nameImg = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/ProfilPics/");
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

router.get("/", async (req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, function (error, result, fields) {
    if (error) throw error;
    res.send(result);
  });
});

router.post("/get-users", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql =
      "SELECT u.id,u.access_id, u.role, u.mail,u.photo, u.first_name, u.last_name, u.phone, u.instagram, u.facebook, u.linkedin, u.twitter, u.module_quote, u.module_invoice FROM users u";

    let query = db.query(sql, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.post("/get-infos", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    const { id } = user;

    let sql =
      "SELECT u.id,u.access_id, u.role, u.mail,u.photo, u.first_name, u.last_name, u.phone, u.instagram, u.facebook, u.linkedin, u.twitter, u.module_quote, u.module_invoice FROM users u WHERE u.id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result[0]);
    });
  });
});

router.post("/update-main-infos", (req, res) => {
  const mainInfos = req.body.mainInfos;
  let sql = `UPDATE users u
              SET u.first_name = ?, u.last_name = ?, u.mail= ?, u.phone = ?
              WHERE u.id = ?`;
  let query = db.query(
    sql,
    [
      mainInfos.first_name,
      mainInfos.last_name,
      mainInfos.mail,
      mainInfos.phone,
      mainInfos.id,
    ],
    function (error, result, fields) {
      if (error) return res.send(false);
      return res.send(true);
    }
  );
});

router.post("/upload-profil-pic", upload.single("file"), (req, res) => {
  // return res.send(nameImg);
  var imgsrc =
    process.env.FRONT_URL + "/public/Images/ProfilPics/" + req.file.filename;
  // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"

  res.send(imgsrc);
});

router.post("/upload-pic-name", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const imgsrc = req.body.imgsrc;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    var insertData = "UPDATE users c SET c.photo = ? WHERE c.id = ?";
    db.query(insertData, [imgsrc, id], (err, result) => {
      if (err) throw err;
      res.send(true);
    });
  });
});

router.post("/get-profil-pic", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = "SELECT u.photo FROM users u WHERE u.id = ?";
    let query = db.query(sql, [id], function (error, result, fields) {
      if (error) return res.send(false);

      return res.send(result);
    });
  });
});

router.post("/get-users-select", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = "SELECT u.id, u.first_name, u.last_name FROM users u ";
    let query = db.query(sql, function (error, result, fields) {
      if (error) return res.send(false);
      return res.send(result);
    });
  });
});

router.post("/create-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const newUser = req.body.newUser;
  var ciphertext = CryptoJS.AES.encrypt(
    newUser.password,
    process.env.CRYPTO_SECURITY_KEY
  ).toString();
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let verifMail = "SELECT u.mail FROM users u WHERE u.mail = ?";
    let queryMail = db.query(
      verifMail,
      newUser.mail,
      function (error, result, fields) {
        if (error) return res.send(false);
        if (result.length > 0) {
          return res.send("mail");
        } else {
          let sql =
            "INSERT INTO users (first_name, last_name, mail, role, access_id, password) VALUES(?, ?, ?, ?, ?, ?) ";
          let query = db.query(
            sql,
            [
              newUser.first_name,
              newUser.last_name,
              newUser.mail,
              newUser.role,
              newUser.access_id,
              ciphertext,
            ],
            function (error, result, fields) {
              if (error) return res.send(false);
              return res.send(true);
            }
          );
        }
      }
    );
  });
});

router.post("/delete-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = "DELETE FROM users WHERE id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.post("/get-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql =
      "SELECT first_name, last_name, mail, role, access_id, password FROM users WHERE id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.patch("/update-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  console.log("data", data);
  var ciphertext = CryptoJS.AES.encrypt(
    data.password,
    process.env.CRYPTO_SECURITY_KEY
  ).toString();
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `UPDATE users u SET u.first_name = ?, u.last_name = ?, u.role = ?, u.access_id = ? WHERE u.id = ?`;
    let query = db.query(
      sql,
      [data.first_name, data.last_name, data.role, data.access_id, data.id],
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
