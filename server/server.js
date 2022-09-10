const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var api = require("./api.js");
require("dotenv").config();

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key ? process.env.private_key.replace(/\\n/g, "\n") : process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }),
});

async function decodeIDToken(req, res, next) {
  if (
    req &&
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log(decodedToken);
      req["currentUser"] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

const PORT = process.env.PORT || 5000;

const app = express();
var http = require("http").createServer(app);

http.listen(process.env.PORT || 5000, function () {
  var host = http.address().address;
  var port = http.address().port;
  console.log("App listening to port: ", port);
});


app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(decodeIDToken); // for firebase authentication.
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

api.setApp(app, admin);
